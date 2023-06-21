'use client';

import { useState } from 'react';
import MainBtn from './MainBtn';

function AddComment() {
  const [charsLeft, setCharsLeft] = useState(250);
  const [comment, setComment] = useState('');

  return (
    <div className='mt-6 bg-white rounded-lg p-6'>
      <form action=''>
        <h2 className='text-xl font-semibold'>Add Comment</h2>
        <textarea
          maxLength={250}
          required
          onChange={(e) => (
            setComment(e.target.value),
            setCharsLeft(250 - e.target.value.length)
          )}
          value={comment}
          className='w-full bg-gray-100 mt-6 p-4 rounded-md outline-transparent valid:focus:outline-purple-600 transition-all invalid:outline-pink-600'
          placeholder='Type your comment here'
        />
        <div className='flex items-center justify-between mt-6'>
          <p className='text-gray-500'>{charsLeft} Characters left</p>
          <MainBtn>Post Comment</MainBtn>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
