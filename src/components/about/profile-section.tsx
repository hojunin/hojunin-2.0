import React from 'react';
import Typography from '../common/typography';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  thumbnail: string;
  alignLeft: boolean;
}

const ProfileSection = ({
  title,
  description,
  thumbnail,
  alignLeft,
}: Props) => {
  return (
    <section className="w-full flex gap-x-6 items-center">
      {alignLeft && (
        <Image
          src={thumbnail}
          alt={`${title} 이미지`}
          width={180}
          height={180}
          className="rounded-sm w-40 h-40"
        />
      )}
      <div>
        <Typography
          variant={'h2'}
          className={alignLeft ? 'text-left' : 'text-right'}
        >
          {title}
        </Typography>

        <Typography
          variant={'p'}
          className="whitespace-pre-line text-muted-foreground"
        >
          {description}
        </Typography>
      </div>
      {!alignLeft && (
        <Image
          src={thumbnail}
          alt={`${title} 이미지`}
          width={180}
          height={180}
          className="rounded-sm w-40 h-40"
        />
      )}
    </section>
  );
};

export default ProfileSection;
