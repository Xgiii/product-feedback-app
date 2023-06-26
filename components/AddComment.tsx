'use client';

import { useState, useTransition } from 'react';
import MainBtn from './MainBtn';
import { addComment } from '@/app/actions';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

function AddComment({ feedbackId }: { feedbackId: string }) {
  const [charsLeft, setCharsLeft] = useState(250);
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');

  const { data: session } = useSession();

  return (
    <div className='mt-6 bg-white rounded-lg p-6'>
      <form
        action={async (formData) => {
          setError('');
          try {
            startTransition(() =>
              addComment(formData, feedbackId, session?.user?._id!)
            );
            setComment('');
            setCharsLeft(250);
          } catch (error: any) {
            setError(error);
          }
        }}
      >
        <h2 className='text-xl font-semibold'>Add Comment</h2>
        <textarea
          maxLength={250}
          required
          onChange={(e) => (
            setComment(e.target.value),
            setCharsLeft(250 - e.target.value.length)
          )}
          name='comment'
          value={comment}
          className='w-full bg-gray-100 mt-6 p-4 rounded-md outline-transparent valid:focus:outline-purple-600 transition-all invalid:outline-pink-600'
          placeholder='Type your comment here'
        />
        <div className='flex items-center justify-between mt-6'>
          <p className='text-gray-500'>{charsLeft} Characters left</p>
          <MainBtn className='min-w-[9rem] min-h-[2rem]'>
            {isPending ? <Spinner size='small' /> : 'Post Comment'}
          </MainBtn>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
