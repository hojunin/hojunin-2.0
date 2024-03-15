'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { ContentsStatus, PostListItemInterface } from '@/types/contents';
const DRAFT_THUMBNAIL =
  'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/dev/prepare.png-13302';
interface Props {
  postItem: PostListItemInterface;
}

const PostListItem = ({ postItem }: Props) => {
  const { push } = useRouter();
  const onClickItem = (item: PostListItemInterface) => {
    push(`/contents/${postItem.category}/${item.slug}`);
  };
  return (
    <Card
      className="group cursor-pointer"
      onClick={() => onClickItem(postItem)}
    >
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
    </Card>
  );
};

export default PostListItem;
