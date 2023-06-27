'use client';

import { Comment } from '@/types/models';
import React, { useState, useTransition } from 'react';
import MainBtn from './MainBtn';
import { addComment } from '@/app/actions';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

function Comment({
  comment,
  replies,
}: {
  comment: Comment;
  replies: Comment[];
}) {
  const [reply, setReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const commentReplies = replies.filter(
    (reply) => reply.ancestor === comment.author
  );

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
    <>
      <div className='flex flex-col mt-4 space-y-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <p className='font-semibold'>{comment.author}</p>
            <p className='text-xs font-semibold text-gray-500'>
              {new Intl.DateTimeFormat('pl-PL', dateOptions).format(
                comment.createdAt
              )}
            </p>
          </div>
          <button
            onClick={() => setReply((prevValue) => !prevValue)}
            className='text-blue-600 font-semibold'
          >
            Reply
          </button>
        </div>
        <p className='text-gray-500'>{comment.content}</p>
        {commentReplies && (
          <div className='border-l-2 border-gray-200 pl-6 flex flex-col space-y-4'>
            {commentReplies.map((reply) => (
              <div key={reply._id?.toString()} className='space-y-2 mb-2'>
                <div className='flex items-center space-x-4'>
                  <p className='font-semibold text-sm'>{reply.author}</p>
                  <p className='text-xs font-semibold text-gray-500'>
                    {new Intl.DateTimeFormat('pl-PL', dateOptions).format(
                      reply.createdAt
                    )}
                  </p>
                </div>
                <p className='text-gray-500 text-sm'>
                  <span className='text-purple-600 font-semibold'>
                    @{reply.ancestor + ' '}
                  </span>
                  {reply.content}
                </p>
              </div>
            ))}
          </div>
        )}
        {reply && (
          <form
            action={async (formData) => {
              startTransition(() =>
                addComment(
                  formData,
                  comment.feedbackId.toString(),
                  session?.user.username!,
                  comment.author
                )
              );
              setReplyContent('');
              setReply(false);
            }}
            className='flex space-x-2 items-center'
          >
            <input
              maxLength={250}
              required
              name='comment'
              onChange={(e) => setReplyContent(e.target.value)}
              value={replyContent}
              className='w-full bg-gray-100 px-4 py-2 rounded-md outline-transparent valid:focus:outline-purple-600 transition-all invalid:outline-pink-600'
              placeholder='Type your reply here'
            />
            <MainBtn>{isPending ? <Spinner size='small' /> : 'Submit'}</MainBtn>
          </form>
        )}
        {!comment.ancestor && <div className='h-[1px] w-full bg-gray-200' />}
      </div>
    </>
  );
}

export default Comment;
