import { filters } from '@/utils';
import React from 'react';
import Filter from './FIlter';

function FiltersTile() {
  return (
    <div className='w-full rounded-lg bg-white flex justify-center md:justify-start content-start flex-wrap p-6'>
      {filters.map((filter, index) => (
        <Filter key={index} filter={filter} />
      ))}
    </div>
  );
}

export default FiltersTile;
