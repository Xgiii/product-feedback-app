import AuthCheck from '@/components/AuthCheck';
import BoardTile from '@/components/BoardTile';
import FeedbackList from '@/components/FeedbackList';
import FiltersTile from '@/components/FiltersTile';
import RoadmapTile from '@/components/RoadmapTile';
import SuggestionsBanner from '@/components/SuggestionsBanner';
import { Feedback } from '@/types/models';
import { connectToDb } from '@/utils';
import React from 'react';

async function getFeedbackList() {
  const client = await connectToDb();
  const feedbackCol = client.db().collection<Feedback>('feedback');
  const feedbackList = await feedbackCol.find({}).toArray();
  client.close();
  return feedbackList;
}

async function HomePage() {
  const feedbackList: Feedback[] = await getFeedbackList();

  return (
    <AuthCheck>
      <div className='mx-auto grid grid-cols-1 gap-10 lg:grid-cols-6 py-10 md:py-20 w-[85vw] xl:w-[1080px]'>
        <div className='lg:col-span-2 flex flex-col md:flex-row lg:flex-col space-x-0  md:space-x-4 lg:space-x-0 space-y-10 md:space-y-0 lg:space-y-10'>
          <BoardTile />
          <FiltersTile />
          <RoadmapTile />
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
