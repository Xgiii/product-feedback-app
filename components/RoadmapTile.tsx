import Link from 'next/link';
import React from 'react';

function RoadmapTile() {
  return (
    <div className='w-full rounded-lg bg-white p-6'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold text-gray-800'>Roadmap</h2>
        <Link className='text-blue-600 hover:text-blue-700 underline' href='/roadmap'>
          View
        </Link>
      </div>
      <div className='mt-8 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='w-2 h-2 bg-orange-400 rounded-full' />
          <p className='text-gray-400'>Planned</p>
        </div>
        <p className='font-bold'>0</p>
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='w-2 h-2 bg-pink-600 rounded-full' />
          <p className='text-gray-400'>In-Progress</p>
        </div>
        <p className='font-bold'>0</p>
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='w-2 h-2 bg-blue-400 rounded-full' />
          <p className='text-gray-400'>Live</p>
        </div>
        <p className='font-bold'>0</p>
      </div>
    </div>
  );
}

export default RoadmapTile;
