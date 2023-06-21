import Spinner from '@/components/Spinner';
import React from 'react';

function Loading() {
  return (
    <div className='relative h-screen w-screen bg-gradient-to-br from-purple-500 to-blue-600'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Spinner size='big' />
      </div>
    </div>
  );
}

export default Loading;
