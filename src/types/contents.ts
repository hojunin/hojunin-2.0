import { Database } from '../../database.types';
import { Id, ValueOf } from './common';

export interface ContentsTag {
	id: Id;
	name: string;
	path: string;
}

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
	tag: ContentsTag;
	status: ValueOf<typeof ContentsStatus>;
	views: {
		count: number;
	};
}
export type ContentWithTag = Pick<
	Database['public']['Tables']['contents']['Row'],
	'slug' | 'title' | 'status' | 'thumbnail' | 'description' | 'created_at'
> & {
	tag: Database['public']['Tables']['contents_tag']['Row'];
};

export interface PostMetaData {
	slug: string;
	title: string;
	description: string;
	thumbnail: string;
	tag: ContentsTag;
	created_at: Date;
	status: ValueOf<typeof ContentsStatus>;
}
