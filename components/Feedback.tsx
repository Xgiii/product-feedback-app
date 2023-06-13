import { Feedback } from '@/types/models';
import React from 'react';
import Category from './Category';

function Feedback({ feedback }: { feedback: Feedback }) {
  return (
    <div className='bg-white rounded-lg p-6 flex items-center justify-between'>
      <div className='flex space-x-10'>
        <div className='bg-gray-100 rounded-lg flex flex-col self-center py-2 px-4 cursor-pointer group hover:bg-blue-600 hover:text-white transition-all'>
          <p className='text-blue-600 group-hover:text-white text-xl leading-3 pt-2 font-bold'>
            ^
          </p>
          <p className='text-sm font-bold '>
            {feedback.upvotes ? feedback.upvotes.length : 0}
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
