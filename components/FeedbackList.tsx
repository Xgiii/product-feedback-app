import { Feedback as IFeedback } from '@/types/models';
import React from 'react';
import Feedback from './Feedback';

function FeedbackList({ feedbackList }: { feedbackList: IFeedback[] }) {
  return (
    <div className='flex flex-col space-y-5'>
      {feedbackList.map((feedback) => (
        <Feedback feedback={feedback} key={feedback._id.toString()} />
      ))}
    </div>
  );
}

export default FeedbackList;
