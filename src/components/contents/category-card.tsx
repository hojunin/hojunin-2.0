import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Book,
  BriefcaseIcon,
  CircleDollarSignIcon,
  CodeIcon,
  HeadphonesIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  category: string;
  path: string;
}

const CategoryCard = ({ category, path }: Props) => {
  const CategoryIcon = ({ label }: { label: string }) => {
    switch (label) {
      case '개발':
        return <CodeIcon color="#aeaeae" />;
      case '생활':
        return <HeadphonesIcon color="#aeaeae" />;
      case '커리어':
        return <BriefcaseIcon color="#aeaeae" />;
      case '제테크':
        return <CircleDollarSignIcon color="#aeaeae" />;
      case '독서':
        return <Book color="#aeaeae" />;
      default:
        return <XIcon color="#aeaeae" />;
    }
  };
  const getDescription = (label: string) => {
    switch (label) {
      case '개발':
        return '개발 이야기';
      case '생활':
        return '사는 이야기';
      case '커리어':
        return '커리어 이야기';
      case '독서':
        return '책 먹기';
      case '제테크':
        return '돈 되는 이야기';
      default:
        return '으잉';
    }
  };
  return (
    <Link href={`/contents/category${path}`}>
      <Card>
        <CardHeader>
          <CategoryIcon label={category} />
          <CardTitle>{category}</CardTitle>
          <CardDescription>{getDescription(category)}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CategoryCard;
