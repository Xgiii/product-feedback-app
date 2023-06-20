'use client';

import { useRouter, useSearchParams } from 'next/navigation';

function Filter({ filter }: { filter: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCat = searchParams.get('cat');
  const sortOption = searchParams.get('sort');

  return (
    <div
      onClick={() =>
        router.push(`/home?cat=${filter}&sort=${sortOption || 'Oldest'}`)
      }
      className={`${
        activeCat === filter
          ? 'text-white bg-blue-600'
          : 'bg-gray-100 text-blue-600 hover:text-white hover:bg-blue-600'
      }  transition-all self-start font-bold text-xs rounded-lg  px-3 lg:px-4 py-1.5 lg:mr-3 mt-2 mr-2  cursor-pointer`}
    >
      {filter}
    </div>
  );
}

export default Filter;
