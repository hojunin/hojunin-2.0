'use client';
import React from 'react';
import {
  Card,
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
import { PostListItemInterface } from '@/types/contents';

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
      className="cursor-pointer hover:opacity-70"
      onClick={() => onClickItem(postItem)}
    >
      <CardHeader className="block">
        <Image
          src={postItem.thumbnail}
          alt="image-test"
          className="rounded-lg"
          width={500}
          height={250}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </CardHeader>

      <CardHeader>
        <CardTitle>{postItem.title}</CardTitle>
        <CardDescription>{postItem.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">
                NEW
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>발행한지 1주일 된 컨텐츠입니다</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
          HOT
        </Badge>
        <Badge className="bg-gradient-to-r from-gray-500 to-yellow-500">
          Frontend
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PostListItem;
