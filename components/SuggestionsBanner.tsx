'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import MainBtn from './MainBtn';
import { sortingOptions } from '@/utils';
import { useSearchParams, useRouter } from 'next/navigation';

function SuggestionsBanner({ suggestions }: { suggestions: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSortOption = searchParams.get('sort') || sortingOptions[0];
  const activeCat = searchParams.get('cat');

  const [sortOption, setSortOption] = useState(activeSortOption);

  function sortOptionChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/home?cat=${activeCat || 'All'}&sort=${e.target.value}`);
    setSortOption(e.target.value);
  }

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
        <div className='flex items-start'>
          <p className='text-gray-300 sm:ml-4 text-sm'>Sort by:</p>
          <select
            onChange={sortOptionChangeHandler}
            value={sortOption}
            className='bg-transparent text-sm ml-2 outline-none'
          >
            {sortingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <Link className='w-full sm:w-auto' href='/add-feedback'>
        <MainBtn className='mt-4 sm:mt-0'>+ Add Feedback</MainBtn>
      </Link>
    </div>
  );
}

export default SuggestionsBanner;
