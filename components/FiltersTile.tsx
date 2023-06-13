import { filters } from '@/utils';
import React from 'react';
import Category from './Category';

function FiltersTile() {
  return (
    <div className='w-full rounded-lg bg-white flex justify-center md:justify-start content-start flex-wrap p-6'>
      {filters.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
}

export default FiltersTile;
