'use client';

import { Feedback } from '@/types/models';
import React, {
  useState,
  experimental_useOptimistic as useOptimistic,
} from 'react';
import Category from './Category';
import { upvote } from '@/app/actions';
import { useSession } from 'next-auth/react';

function Feedback({ feedback }: { feedback: Feedback }) {
  const { data: session } = useSession();
  const [optimisticUpvotes, addOptimisticUpvotes] = useOptimistic(
    {
      upvotesCount: feedback.upvotes ? feedback.upvotes.length : 0,
    },
    (state, newUpvotesCount: number) => ({
      ...state,
      upvotesCount: newUpvotesCount,
    })
  );
  const [active, setActive] = useState(
    feedback.upvotes?.find((i) => i === session?.user._id!) ? true : false
  );

  return (
    <div className='bg-white rounded-lg p-6 flex items-center justify-between'>
      <div className='flex space-x-6'>
        <div
          onClick={async () => {
            setActive((prevState) => !prevState);
            addOptimisticUpvotes(
              active
                ? optimisticUpvotes.upvotesCount - 1
                : optimisticUpvotes.upvotesCount + 1
            );
            await upvote(feedback._id.toString(), session?.user._id!);
          }}
          className={`rounded-lg flex flex-col items-center justify-center self-center h-12 min-w-[2rem] cursor-pointer group ${
            active
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-gray-100'
          }  transition-all`}
        >
          <p
            className={`${
              active ? 'text-white' : 'text-blue-600'
            }  text-xl leading-3 pt-2 font-bold`}
          >
            ^
          </p>
          <p className='text-sm font-bold flex items-center justify-center'>
            {optimisticUpvotes.upvotesCount}
          </p>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-bold text-gray-800'>{feedback.title}</h2>
          <p className='text-gray-500 text-sm mt-1'>{feedback.details}</p>
          <Category category={feedback.category} />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
