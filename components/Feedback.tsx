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
      <div className='flex space-x-10'>
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
          className={`rounded-lg flex flex-col items-center justify-center self-center h-12 w-8 cursor-pointer group ${
            active
              ? 'bg-blue-600 text-white hover:text-black hover:bg-gray-100'
              : 'bg-gray-100  hover:bg-blue-600 hover:text-white'
          }  transition-all`}
        >
          <p
            className={`${
              active
                ? 'text-white group-hover:text-blue-600'
                : 'text-blue-600 group-hover:text-white'
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
