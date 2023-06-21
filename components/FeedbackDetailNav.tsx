'use client';

import { useRouter } from 'next/navigation';
import MainBtn from './MainBtn';
import { useSession } from 'next-auth/react';

function FeedbackDetailNav({ feedbackUid }: { feedbackUid: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='mb-10 flex items-center justify-between'>
      <p
        onClick={() => router.back()}
        className='text-gray-500 hover:underline cursor-pointer'
      >
        {'< Go Back'}
      </p>
      {session?.user._id === feedbackUid && <MainBtn>Edit Feedback</MainBtn>}
    </div>
  );
}

export default FeedbackDetailNav;
