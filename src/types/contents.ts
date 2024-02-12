import { Id, ValueOf } from './common';

export const ContentsCategory = {
  DEV: 'dev',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DEVOPS: 'devops',
  DATABASE: 'database',
  ETC: 'etc',
  MONEY: 'money',
  LIFE: 'life',
} as const;

export interface PostListItemInterface {
  id: Id;
  created_at: Date;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
  category: ValueOf<typeof ContentsCategory>;
  body: string;
}
