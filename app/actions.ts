'use server';

import { connectToDb } from '@/utils';
import { hashSync } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

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

  if (!title || !category || !details || !uid) {
    throw new Error('Invalid input');
  }

  await feedbackCol.insertOne({
    title,
    category,
    details,
    uid,
  });

  client.close();
  redirect('/home');
}
