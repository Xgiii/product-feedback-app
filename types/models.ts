import { ObjectId } from 'mongodb';

export interface Feedback {
  _id: ObjectId;
  title: string;
  category: 'All' | 'UI' | 'UX' | 'Enhancement' | 'Bug' | 'Feature';
  details: string;
  uid: ObjectId;
  createdAt: Date;
  upvotes?: string[];
}
