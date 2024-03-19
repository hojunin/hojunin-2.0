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
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/server';
import { ContentsTag } from '@/types/contents';
import { ChevronDownIcon, SlashIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

interface Props {
  tag: ContentsTag;
  title: string;
}

const ContentsDetailBreadCrumb = async ({ tag, title }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: tags, error } = await supabase.from('contents_tag').select('*');
  if (error || !tags) {
    return (
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-10 h-6" />
      </div>
    );
  }
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
              {tag.name}
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {(tags as ContentsTag[]).map((tag) => (
                <DropdownMenuItem key={tag.id}>
                  <Link
                    href={`/contents/category${tag.path}`}
                    className="w-full"
                  >
                    {tag.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ContentsDetailBreadCrumb;
