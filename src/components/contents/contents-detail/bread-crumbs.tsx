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
import { ContentsTag, ContentTag, ContentWithTag } from '@/types/contents';
import { ChevronDownIcon, SlashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
	tags: ContentTag[];
	metaData: ContentWithTag;
}

const ContentsDetailBreadCrumb = async ({ tags, metaData }: Props) => {
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
							{metaData.tag.name}
							<ChevronDownIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{(tags as ContentsTag[]).map(tag => (
								<DropdownMenuItem key={tag.id}>
									<Link href={`/contents?tag=${tag.name}`} className="w-full">
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
					<BreadcrumbPage>{metaData.title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default ContentsDetailBreadCrumb;
