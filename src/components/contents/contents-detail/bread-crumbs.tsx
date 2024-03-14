import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import { ChevronDownIcon, SlashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  currentCategory: ValueOf<typeof ContentsCategory>;
  slug: string;
}

const ContentsDetailBreadCrumb = ({ currentCategory, slug }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {currentCategory}
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Link href={'/contents/dev'}>개발</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/contents/life'}>생활</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/contents/money'}>재테크</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{slug}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ContentsDetailBreadCrumb;
