import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';

const ADMIN_LINKS = [
	{
		label: '회고',
		link: '/admin/memoir',
	},
	{
		label: '콘텐츠 작성',
		link: '/admin/write-content',
	},
	{
		label: '콘텐츠 발행',
		link: '/admin/contents-publish',
	},
];

const DetailAdminLinksNavigator = () => {
	return (
		<nav className="flex flex-wrap gap-2">
			{ADMIN_LINKS.map(link => (
				<Link key={link.label} href={link.link}>
					<Badge size={'xl'}>{link.label}</Badge>
				</Link>
			))}
		</nav>
	);
};

export default DetailAdminLinksNavigator;
