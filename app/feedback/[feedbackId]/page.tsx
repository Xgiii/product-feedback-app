import AddComment from '@/components/AddComment';
import AuthCheck from '@/components/AuthCheck';
import CommentFeed from '@/components/CommentFeed';
import Feedback from '@/components/Feedback';
import FeedbackDetailNav from '@/components/FeedbackDetailNav';
import { getFeedbackById } from '@/db';
import React from 'react';

async function FeedbackPage({ params }: { params: { feedbackId: string } }) {
  const feedback = JSON.parse(
    JSON.stringify(await getFeedbackById(params.feedbackId))
  );

  return (
    <AuthCheck>
      <div className='mx-auto py-10 w-[85vw] lg:w-[768px]'>
        <FeedbackDetailNav feedbackUid={feedback.uid} />
        <Feedback feedback={feedback} />
        <CommentFeed feedbackId={params.feedbackId} />
        <AddComment feedbackId={params.feedbackId} />
      </div>
    </AuthCheck>
  );
}

export default FeedbackPage;
