import React from 'react';

import Image from 'next/image';
import { ContentsStatus, PostListItemInterface } from '@/types/contents';
import PostListItemViewCount from '@/components/contents/post/post-list-item-view-count';
import Typography from '@/components/common/typography';
import dayjs from 'dayjs';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const DRAFT_THUMBNAIL =
  'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302';
interface Props {
  postItem: PostListItemInterface;
}

const PostListItem = ({ postItem }: Props) => {
  return (
    <Link href={`/contents/${postItem.category}/${postItem.slug}`}>
      <Card className="group cursor-pointer flex flex-col justify-between h-full">
        <CardHeader>
          <Image
            src={
              postItem.status === ContentsStatus.RESERVED
                ? DRAFT_THUMBNAIL
                : postItem.thumbnail
            }
            alt={`${postItem.title} 대표 이미지`}
            className="group-hover:scale-105 transition-all rounded-lg mb-3"
            width={500}
            height={250}
          />
          <CardTitle>{postItem.title}</CardTitle>
          <CardDescription>{postItem.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <PostListItemViewCount slug={postItem.slug} />
          <Typography variant={'span'} typo={'mute'}>
            {dayjs(postItem.created_at).format('YYYY-MM-DD')}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostListItem;
