import SignUpForm from '@/components/SignUpForm';
import React from 'react';

function EnterPage() {
  return (
    <div className='relative h-screen w-screen bg-gradient-to-br from-purple-500 to-blue-600'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <SignUpForm />
      </div>
    </div>
  );
}

export default EnterPage;
