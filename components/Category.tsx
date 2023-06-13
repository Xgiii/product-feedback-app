import React from 'react';

function Category({ category }: { category: string }) {
  return (
    <div className='bg-gray-100 hover:text-white hover:bg-blue-600 transition-all self-start font-bold text-xs rounded-lg text-blue-600 px-3 lg:px-4 py-1.5 lg:mr-3 mt-2 mr-2  cursor-pointer'>
      {category}
    </div>
  );
}

export default Category;
