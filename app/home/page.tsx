import AuthCheck from '@/components/AuthCheck';
import BoardTile from '@/components/BoardTile';
import FeedbackList from '@/components/FeedbackList';
import FiltersTile from '@/components/FiltersTile';
import SuggestionsBanner from '@/components/SuggestionsBanner';
import { getFeedbackList } from '@/db';
import { Feedback } from '@/types/models';
import React from 'react';

async function HomePage({
  searchParams,
}: {
  searchParams: {
    cat: 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
    sort: 'Oldest' | 'Newest' | 'Most Upvotes' | 'Least Upvotes';
  };
}) {
  const feedbackList: Feedback[] = JSON.parse(
    JSON.stringify(await getFeedbackList(searchParams?.cat, searchParams?.sort))
  );

  return (
    <AuthCheck>
      <div className='mx-auto grid grid-cols-1 gap-10 lg:grid-cols-6 py-10 md:py-20 w-[85vw] xl:w-[1080px]'>
        <div className='lg:col-span-2 flex flex-col md:flex-row lg:flex-col space-x-0  md:space-x-4 lg:space-x-0 space-y-10 md:space-y-0 lg:space-y-10'>
          <BoardTile />
          <FiltersTile />
        </div>
        <div className='lg:col-span-4 flex flex-col space-y-10'>
          <SuggestionsBanner suggestions={feedbackList.length} />
          <FeedbackList feedbackList={feedbackList} />
        </div>
      </div>
    </AuthCheck>
  );
}

export default HomePage;
