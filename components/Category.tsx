import React from 'react';

function Category({ category }: { category: string }) {
  return (
    <div className='bg-gray-100 self-start font-bold text-xs rounded-lg text-blue-600 px-3 lg:px-4 py-1.5 mt-2'>
      {category}
    </div>
  );
}

export default Category;
