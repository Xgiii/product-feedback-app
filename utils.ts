import { MongoClient } from 'mongodb';
import { Feedback } from './types/models';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export const categories = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
export const filters = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

export async function getFeedbackList() {
  const client = await connectToDb();
  const feedbackCol = client.db().collection<Feedback>('feedback');
  const feedbackList = await feedbackCol.find({}).toArray();
  client.close();
  return feedbackList;
}
