'use server';

import { connectToDb } from '@/utils';
import { hashSync } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import { Feedback } from '@/types/models';
import { revalidatePath } from 'next/cache';

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

  let createdAt: string | number = Date.now();
  createdAt = new Intl.DateTimeFormat('en-US').format(createdAt);

  if (!title || !category || !details || !uid) {
    throw new Error('Invalid input');
  }

  await feedbackCol.insertOne({
    title,
    category,
    details,
    uid,
    createdAt,
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

  console.log(feedback.upvotes);
  

  if (feedback.upvotes?.find((id) => id === uid)) {
    await feedbackCol.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { upvotes: uid } }
    );
  } else {
    await feedbackCol.updateOne(
      { _id: new ObjectId(id) },
      { $push: { upvotes: uid } }
    );
  }

  revalidatePath('/home');
  client.close();
}
