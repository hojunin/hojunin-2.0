import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Image from 'next/image';

const TechPostListItem = () => {
  return (
    <Card className="cursor-pointer hover:opacity-70">
      <CardHeader className="block">
        <Image
          src="https://i.imgur.com/HdCGCgV.png"
          alt="image-test"
          className="rounded-lg"
          layout="responsive"
          sizes="250px"
          width={500}
          height={250}
        />
      </CardHeader>

      <CardHeader>
        <CardTitle>기술 타이틀</CardTitle>
        <CardDescription>기술 타이틀</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TechPostListItem;
