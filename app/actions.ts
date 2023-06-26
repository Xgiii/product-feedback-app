'use server';

import { hashSync } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import { Feedback } from '@/types/models';
import { revalidatePath } from 'next/cache';
import { connectToDb } from '@/db';

export async function addUser(formData: FormData) {
  const client = await connectToDb();
  const usersCol = client.db().collection('users');

  const username = formData.get('username') as string;
  let password = formData.get('password') as string;

  const user = await usersCol.findOne({ username });

  if (!username) {
    throw new Error('Invalid input');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 chars long');
  }
  if (user) {
    throw new Error('User already exists');
  }

  password = hashSync(password, 10);

  await usersCol.insertOne({
    username: username,
    password: password,
  });

  client.close();
  redirect('/');
}

export async function addFeedback(formData: FormData) {
  const session = await getServerSession(authOptions);
  const client = await connectToDb();
  const feedbackCol = client.db().collection('feedback');

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const details = formData.get('details') as string;
  const uid = new ObjectId(session?.user._id);
  const upvotesNum = 0;

  const createdAt = new Date();

  if (!title || !category || !details || !uid) {
    throw new Error('Invalid input');
  }

  await feedbackCol.insertOne({
    title,
    category,
    details,
    uid,
    createdAt,
    upvotesNum,
  });

  client.close();
  redirect('/home');
}

export async function upvote(id: string, uid: string) {
  const client = await connectToDb();
  const feedbackCol = client.db().collection<Feedback>('feedback');

  const feedback = await feedbackCol.findOne({ _id: new ObjectId(id) });

  if (!feedback) {
    throw new Error('Something went wrong');
  }

  if (feedback.upvotes?.find((id) => id === uid)) {
    await feedbackCol.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { upvotes: uid }, $inc: { upvotesNum: -1 } }
    );
  } else {
    await feedbackCol.updateOne(
      { _id: new ObjectId(id) },
      { $push: { upvotes: uid }, $inc: { upvotesNum: 1 } }
    );
  }

  revalidatePath('/home');
  client.close();
}

export async function addComment(
  formData: FormData,
  feedbackId: string,
  uid: string,
  ancestor?: string
) {
  const client = await connectToDb();

  const content = formData.get('comment') as string;
  const commentsCol = client.db().collection<Comment>('comments');

  if (!client || !uid || !content) {
    throw new Error('Invalid input');
  }

  await commentsCol.insertOne({
    feedbackId: new ObjectId(feedbackId),
    createdAt: new Date(),
    uid: new ObjectId(uid),
    content,
    ancestor,
  });

  revalidatePath(`/feedback/${feedbackId}`);
}
