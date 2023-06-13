import { MongoClient } from 'mongodb';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export const categories = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
export const filters = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
