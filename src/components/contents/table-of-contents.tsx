'use client';

import { useEffect, useState } from 'react';
import { HeadingItem } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
	headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('');
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// 스크롤 이벤트 리스너로 현재 활성화된 섹션 추적
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100; // 100px 오프셋
			
			// 모든 heading 요소들을 찾아서 현재 스크롤 위치와 비교
			for (let i = headings.length - 1; i >= 0; i--) {
				const element = document.getElementById(headings[i].slug);
				if (element && element.offsetTop <= scrollPosition) {
					setActiveId(headings[i].slug);
					break;
				}
			}
		};

		// 페이지 로드 시 TOC 표시 여부 결정
		const checkVisibility = () => {
			const hasEnoughContent = headings.length >= 2;
			const hasLongContent = document.body.scrollHeight > window.innerHeight * 1.5;
			
			// 화면 너비가 768px보다 큰지 확인 (콘텐츠 max-width + 여백)
			// (100vw - 768px) / 2 - 30px 공간이 TOC를 표시할 수 있는지 확인
			const availableSpace = (window.innerWidth - 768) / 2 - 30;
			const tocMinWidth = 200; // TOC 최소 너비
			const hasEnoughSpace = availableSpace >= tocMinWidth;
			
			setIsVisible(hasEnoughContent && hasLongContent && hasEnoughSpace);
		};

		handleScroll();
		checkVisibility();
		
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', checkVisibility);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', checkVisibility);
		};
	}, [headings]);

	const handleClick = (slug: string) => {
		const element = document.getElementById(slug);
		if (element) {
			const elementPosition = element.offsetTop;
			const offsetPosition = elementPosition - 90;
			
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			
			// URL 업데이트
			window.history.replaceState(null, '', `#${slug}`);
		}
	};

	if (!isVisible || headings.length === 0) {
		return null;
	}

	return (
		<div 
			className="fixed top-1/2 z-50 -translate-y-1/2"
			style={{
				left: `calc((100vw - 768px) / 2 - 100px)`,
				transform: 'translateX(-100%) translateY(-50%)',
				maxHeight: 'calc(100vh - 120px)' // 상하 여백을 줄여서 더 많은 공간 확보
			}}
		>
			<div 
				className="rounded-lg border bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-700 max-w-[300px] flex flex-col"
				style={{ maxHeight: 'calc(100vh - 240px)' }}
			>
				<h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white flex-shrink-0">
					목차
				</h3>
				<nav className="space-y-1 overflow-y-auto flex-1 pr-1">
					{headings.map((heading) => (
						<button
							key={heading.slug}
							onClick={() => handleClick(heading.slug)}
							className={cn(
								'block w-full text-left text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 truncate',
								{
									'text-blue-600 dark:text-blue-400 font-medium': activeId === heading.slug,
									'text-gray-600 dark:text-gray-400': activeId !== heading.slug,
									'pl-0': heading.level === 1,
									'pl-3': heading.level === 2,
									'pl-6': heading.level === 3,
									'pl-9': heading.level === 4,
									'pl-12': heading.level === 5,
									'pl-15': heading.level === 6,
								}
							)}
						>
							{heading.text}
						</button>
					))}
				</nav>
			</div>
		</div>
	);
} 