'use server';

import { connectToDb } from '@/utils';
import { hashSync } from 'bcrypt';
import { redirect } from 'next/navigation';

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
  redirect('/')
}
