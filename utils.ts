import { MongoClient } from 'mongodb';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
