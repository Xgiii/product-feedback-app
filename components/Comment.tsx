import { connectToDb } from '@/db';
import { Comment } from '@/types/models';
import { ObjectId } from 'mongodb';
import React from 'react';

async function getAuthor(uid: ObjectId) {
  const client = await connectToDb();
  const usersCol = client.db().collection('users');
  const user = await usersCol.findOne({ _id: uid });
  client.close();
  return user?.username;
}

async function Comment({ comment }: { comment: Comment }) {
  const author = await getAuthor(comment.uid);

  const dateOptions: any = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Poland',
  };

  return (
    <div className='flex flex-col mt-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <p className='font-semibold'>@{author}</p>
          <p className='text-xs font-semibold text-gray-500'>{new Intl.DateTimeFormat('pl-PL', dateOptions).format(comment.createdAt)}</p>
        </div>
        <button className='text-blue-600 font-semibold'>Reply</button>
      </div>
      <p className='text-gray-500'>{comment.content}</p>
      {!comment.ancestor && <div className='h-[1px] w-full bg-gray-200' />}
    </div>
  );
}

export default Comment;
