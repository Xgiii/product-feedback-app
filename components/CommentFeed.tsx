import { connectToDb } from '@/db';
import { ObjectId } from 'mongodb';
import React from 'react';
import Comment from './Comment';

async function getComments(feedbackId: string) {
  const client = await connectToDb();
  const commentsCol = client.db().collection<Comment>('comments');
  const comments = await commentsCol
    .find({ feedbackId: new ObjectId(feedbackId) })
    .sort({ createdAt: -1 })
    .toArray();
  client.close();
  return comments;
}

async function CommentFeed({ feedbackId }: { feedbackId: string }) {
  const comments = await getComments(feedbackId);
  console.log(comments);

  return (
    <div className='mt-6 bg-white rounded-lg p-6'>
      <h2 className='text-xl font-semibold'>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h2>
      {comments.map((comment) => (
        <Comment key={comment._id.toString()} comment={comment} />
      ))}
    </div>
  );
}

export default CommentFeed;
