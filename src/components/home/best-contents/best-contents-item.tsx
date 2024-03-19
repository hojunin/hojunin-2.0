import Typography from '@/components/common/typography';
import { PostListItemInterface } from '@/types/contents';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  content: PostListItemInterface;
}

const BestContentsItem = ({ content }: Props) => {
  return (
    <li className="flex flex-1">
      <Link
        href={`/contents/${content.slug}`}
        className="flex flex-col gap-y-3 p-3 rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <Image
          src={content.thumbnail}
          alt={`${content.title} 미리보기 이미지`}
          width={200}
          height={100}
          className="self-center"
        />
        <Typography
          variant={'h4'}
          className="text-lg break-words whitespace-normal"
        >
          {content.title}
        </Typography>
      </Link>
    </li>
  );
};

export default BestContentsItem;
