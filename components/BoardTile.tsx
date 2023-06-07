import React from 'react';

function BoardTile() {
  return (
    <div className='w-full min-h-[12rem] rounded-lg bg-gradient-to-r from-blue-500 from-10% via-purple-500 via-30% to-pink-600 to-90% text-white px-8'>
      <h2 className='text-2xl font-bold pt-24'>Frontend Mentor</h2>
      <p className='text-gray-100'>Feedback Board</p>
    </div>
  );
}

export default BoardTile;
