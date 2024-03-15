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

export const ContentsStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  RESERVED: 'reserved',
};

export interface PostListItemInterface {
  id: Id;
  created_at: Date;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
  category: ValueOf<typeof ContentsCategory>;
  status: ValueOf<typeof ContentsStatus>;
}
