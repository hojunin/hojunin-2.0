'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { fetchContents } from '@/api/contents';
import { Content } from '@/types/contents';

interface ContentSelectorProps {
	onSelect: (content: Content) => void;
}

const ContentSelector: React.FC<ContentSelectorProps> = ({ onSelect }) => {
	const [contents, setContents] = useState<Content[]>([]);
	const [selectedContent, setSelectedContent] = useState<Content | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [open, setOpen] = useState(false);

	// 콘텐츠 목록 불러오기
	useEffect(() => {
		const loadContents = async () => {
			try {
				setIsLoading(true);
				const data = await fetchContents({ page: 1, sort: 'newest' });
				setContents(data);
			} catch (error) {
				console.error('콘텐츠 목록 로드 실패:', error);
			} finally {
				setIsLoading(false);
			}
		};

		if (open) {
			loadContents();
		}
	}, [open]);

	// 검색 필터링
	const filteredContents = contents.filter(
		content =>
			content.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			false ||
			content.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			false,
	);

	const handleSelect = (content: Content) => {
		setSelectedContent(content);
		onSelect(content);
		setOpen(false);
	};

	return (
		<div className="w-full">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" className="w-full justify-between">
						{selectedContent ? selectedContent.title || '제목 없음' : '콘텐츠 선택하기'}
						<Search className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>콘텐츠 선택</DialogTitle>
						<DialogDescription>발행할 원본 콘텐츠를 선택하세요</DialogDescription>
					</DialogHeader>

					<div className="my-4">
						<Input
							placeholder="제목 또는 슬러그로 검색"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className="mb-4"
						/>

						{isLoading ? (
							<div className="py-8 text-center">로딩 중...</div>
						) : filteredContents.length === 0 ? (
							<div className="py-8 text-center">검색 결과가 없습니다</div>
						) : (
							<div className="max-h-[400px] divide-y divide-gray-200 overflow-y-auto dark:divide-gray-800">
								{filteredContents.map(content => (
									<div
										key={content.id}
										className="cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
										onClick={() => handleSelect(content)}
									>
										<h3 className="font-medium">{content.title || '제목 없음'}</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											/{content.slug || ''}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ContentSelector;
