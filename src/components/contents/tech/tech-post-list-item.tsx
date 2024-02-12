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
  techPostItem: PostListItemInterface;
}

const TechPostListItem = ({ techPostItem }: Props) => {
  const { push } = useRouter();
  const onClickItem = (item: PostListItemInterface) => {
    push(`/contents/${techPostItem.category}/${item.slug}`);
  };
  return (
    <Card
      className="cursor-pointer hover:opacity-70"
      onClick={() => onClickItem(techPostItem)}
    >
      <CardHeader className="block">
        <Image
          src={techPostItem.thumbnail}
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
        <CardTitle>{techPostItem.title}</CardTitle>
        <CardDescription>{techPostItem.description}</CardDescription>
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

export default TechPostListItem;
