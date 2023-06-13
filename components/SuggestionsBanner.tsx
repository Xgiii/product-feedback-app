import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MainBtn from './MainBtn';

function SuggestionsBanner({ suggestions }: { suggestions: number }) {
  return (
    <div className='bg-indigo-950 w-full sm:h-16 rounded-lg flex flex-col sm:flex-row items-center justify-between py-4 px-6 text-white'>
      <div className='flex items-center'>
        <Image
          src='/light-bulb.svg'
          alt='light-bulb'
          width={28}
          height={28}
          className='mr-3 hidden sm:block'
        />
        <p className='font-bold hidden sm:block'>{suggestions} Suggestions</p>
        <p className='text-gray-300 sm:ml-4 text-sm'>Sort by:</p>
        <p className='text-gray-100 font-semibold ml-1 text-sm'>
          Most Upvotes &#8910;
        </p>
      </div>
      <Link className='w-full sm:w-auto' href='/add-feedback'>
        <MainBtn className='mt-4 sm:mt-0'>+ Add Feedback</MainBtn>
      </Link>
    </div>
  );
}

export default SuggestionsBanner;
