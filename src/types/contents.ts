import { Database } from '../../database.types';
import { Id, ValueOf } from './common';

export type ContentTag = Database['public']['Tables']['contents_tag']['Row'];

export const ContentsStatus = {
	DRAFT: 'draft',
	PUBLISHED: 'published',
	RESERVED: 'reserved',
} as const;

export interface PostListItemInterface {
	id: Id;
	slug: string;
	created_at: Date;
	title: string;
	description: string;
	thumbnail: string;
	tag: ContentTag;
	status: ValueOf<typeof ContentsStatus>;
	views: {
		count: number;
	};
}
export type Content = Pick<
	Database['public']['Tables']['contents']['Row'],
	'id' | 'slug' | 'title' | 'status' | 'thumbnail' | 'description' | 'created_at'
> & {
	tag: Database['public']['Tables']['contents_tag']['Row'];
	views: Database['public']['Tables']['views']['Row'];
};

export type ContentsSortType = 'newest' | 'oldest' | 'popular';

export interface PostMetaData {
	slug: string;
	title: string;
	description: string;
	thumbnail: string;
	tag: ContentTag;
	created_at: Date;
	status: ValueOf<typeof ContentsStatus>;
}
