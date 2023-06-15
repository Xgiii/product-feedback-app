import { MongoClient } from 'mongodb';
import { Feedback } from './types/models';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export const categories = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
export const filters = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

export async function getFeedbackList(
  cat: 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature'
) {
  const client = await connectToDb();
  const feedbackCol = client.db().collection<Feedback>('feedback');
  let feedbackList: Feedback[] = [];

  if (!cat || cat === 'All') {
    feedbackList = await feedbackCol.find({}).toArray();
  } else {
    feedbackList = await feedbackCol.find({ category: cat }).toArray();
  }
  client.close();
  return feedbackList;
}
