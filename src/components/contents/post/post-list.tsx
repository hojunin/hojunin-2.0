import React from 'react';
import PostListItem from './post-list-item';
import { createClient } from '@/lib/supabase/server';
import CommonError from '@/components/common/common-error';
import { ContentsTag } from '@/types/contents';

interface Props {
	tag: ContentsTag;
}

const PostList = async ({ tag }: Props) => {
	const supabase = createClient();
	const { data: postList, error } = await supabase
		.from('contents')
		.select('*')
		.eq('tag', tag.id)
		.order('created_at');

	if (error || !postList) {
		return <CommonError message="데이터가 없어요" />;
	}

	return (
		<ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
			{postList.map(post => (
				<PostListItem key={post.id} postItem={post} />
			))}
		</ul>
	);
};

export default PostList;
