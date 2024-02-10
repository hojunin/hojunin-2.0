import { Date, Id } from './common';

export interface TechPostListItemInterface {
  id: Id;
  created_at: Date;
  title: string;
  description: string;
  thumbnail: string;
}
