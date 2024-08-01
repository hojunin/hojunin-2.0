import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import React from 'react';

import { useShallow } from 'zustand/react/shallow';

import TagList from '@/components/contents/post/tag-list';
import useContentsParamStore from '@/store/contents-param-store';
import clsx from 'clsx';
import useDevice from '@/hooks/useDevice';

const Toolbar = () => {
	const { isMobile } = useDevice();
	const { sort, setSort } = useContentsParamStore(
		useShallow(state => ({
			sort: state.sort,
			setSort: state.setSort,
		})),
	);
	return (
		<section>
			<div className="flex items-center justify-between p-4">
				<div className="flex-1">
					<TagList />
				</div>
				<div className="flex items-center gap-x-2">
					<Select onValueChange={value => setSort(value)}>
						<SelectTrigger
							className={clsx('w-[180px]', {
								'w-[80px]': isMobile,
							})}
						>
							<SelectValue placeholder="정렬" defaultValue={sort} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">최신순</SelectItem>
							<SelectItem value="oldest">오래된 순</SelectItem>
							<SelectItem value="popular">가장 많이 본 순</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</section>
	);
};

export default Toolbar;
