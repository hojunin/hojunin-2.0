'use client';
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { TechPostListItemInterface } from '@/types/tech-post';
import { useRouter } from 'next/navigation';

interface Props {
  techPostItem: TechPostListItemInterface;
}

const TechPostListItem = ({ techPostItem }: Props) => {
  const { push } = useRouter();
  const onClickItem = (item: TechPostListItemInterface) => {
    push(`/contents/${item.slug}`);
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
          layout="responsive"
          sizes="250px"
          width={500}
          height={250}
        />
      </CardHeader>

      <CardHeader>
        <CardTitle>{techPostItem.title}</CardTitle>
        <CardDescription>{techPostItem.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TechPostListItem;
