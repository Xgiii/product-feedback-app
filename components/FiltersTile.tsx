import { categories } from '@/utils';
import React from 'react';

function FiltersTile() {
  return (
    <div className='w-full rounded-lg bg-white flex content-start flex-wrap p-6'>
      {categories.map((category, index) => (
        <div
          key={index}
          className='bg-gray-100 hover:text-white hover:bg-blue-600 transition-all self-start font-bold text-sm rounded-lg text-blue-600 px-3 lg:px-4 py-2 lg:mr-3 lg:mt-3 mr-2 mt-2 cursor-pointer'
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default FiltersTile;
