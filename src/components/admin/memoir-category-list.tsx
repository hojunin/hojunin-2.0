'use client';
import { Badge } from '@/components/ui/badge';
import useMemoirAdminStore from '@/store/memoir-admin';
import Link from 'next/link';
import React from 'react';
interface Props {
	categories: {
		id: number;
		name: string;
		value: string;
	}[];
}

const MemoirCategoryList = ({ categories }: Props) => {
	const { currentCategory, setCurrentCategory } = useMemoirAdminStore(state => ({
		currentCategory: state.currentCategory,
		setCurrentCategory: state.setCurrentCategory,
	}));
	const onClickPath = (path: string) => {
		setCurrentCategory(path);
	};

	return (
		<nav className="flex gap-x-4 py-4">
			{categories.map(({ id, name, value }) => (
				<Link key={id} href={`/admin/memoir/${value}`} onClick={() => onClickPath(value)}>
					<Badge size="lg" variant={currentCategory === value ? 'default' : 'secondary'}>
						{name}
					</Badge>
				</Link>
			))}
		</nav>
	);
};

export default MemoirCategoryList;
