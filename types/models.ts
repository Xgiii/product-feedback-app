import { ObjectId } from 'mongodb';

export interface Feedback {
  _id: ObjectId;
  title: string;
  category: 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
  details: string;
  uid: ObjectId;
  createdAt: Date;
  upvotesNum: number;
  upvotes?: string[];
}

export interface Comment {
  _id?: ObjectId;
  feedbackId: ObjectId;
  author: string;
  content: string;
  createdAt: Date;
  ancestor: string | null;
}
