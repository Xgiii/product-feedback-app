import { MongoClient } from 'mongodb';
import { Feedback } from './types/models';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export async function getFeedbackList(
  cat: 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature',
  sort: 'Oldest' | 'Newest' | 'Most Upvotes' | 'Least Upvotes'
) {
  const client = await connectToDb();
  const feedbackCol = client.db().collection<Feedback>('feedback');
  let feedbackList: Feedback[] = [];
  let sortObj = {};

  switch (sort) {
    case 'Oldest':
      sortObj = { _id: 1 };
      break;
    case 'Newest':
      sortObj = { _id: -1 };
      break;
    case 'Most Upvotes':
      sortObj = { upvotes: -1 };
      break;
    case 'Least Upvotes':
      sortObj = { upvotes: 1 };
      break;
    default:
      sortObj = { _id: 1 };
      break;
  }

  if (!cat || cat === 'All') {
    feedbackList = await feedbackCol.find({}).sort(sortObj).toArray();
  } else {
    feedbackList = await feedbackCol
      .find({ category: cat })
      .sort(sortObj)
      .toArray();
  }
  client.close();
  return feedbackList;
}
