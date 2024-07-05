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
import Link from 'next/link';
import React from 'react';

interface Props {
	tag: {
		label: string;
		path: string;
	};
	title: string;
}

const ContentsDetailBreadCrumb = async ({ tag, title }: Props) => {
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
					<BreadcrumbLink href={tag.path}>{tag.path}</BreadcrumbLink>
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
