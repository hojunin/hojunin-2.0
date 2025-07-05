'use client';

import { ReactNode, useEffect } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import Typography from './typography';

interface HeadingWithAnchorProps {
	children: ReactNode;
	variant: 'h1' | 'h2' | 'h3' | 'h4';
	className?: string;
}

// 텍스트를 URL 친화적인 slug로 변환하는 함수
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9가-힣\s-]/g, '') // 특수문자 제거 (한글 유지)
		.replace(/\s+/g, '-') // 공백을 하이픈으로
		.replace(/-+/g, '-') // 연속된 하이픈을 하나로
		.trim()
		.replace(/^-|-$/g, ''); // 시작과 끝의 하이픈 제거
}

// 텍스트 노드에서 실제 텍스트 추출
function extractTextFromChildren(children: ReactNode): string {
	if (typeof children === 'string') {
		return children;
	}
	if (Array.isArray(children)) {
		return children.map(extractTextFromChildren).join('');
	}
	if (children && typeof children === 'object' && 'props' in children) {
		return extractTextFromChildren((children as any).props.children);
	}
	return '';
}

export default function HeadingWithAnchor({
	children,
	variant,
	className,
}: HeadingWithAnchorProps) {
	const textContent = extractTextFromChildren(children);
	const slug = createSlug(textContent);

	// 페이지 로드 시 해시가 있으면 해당 요소로 스크롤
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (hash === slug) {
			const element = document.getElementById(slug);
			if (element) {
				const elementPosition = element.offsetTop;
				const offsetPosition = elementPosition - 90;
				
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		}
	}, [slug]);

	const handleAnchorClick = async () => {
		const url = `${window.location.origin}${window.location.pathname}#${slug}`;

		// URL 업데이트
		window.history.replaceState(null, '', `#${slug}`);

		// 클립보드에 복사
		try {
			await navigator.clipboard.writeText(url);
			// TODO: 토스트 메시지로 복사 완료 알림 (선택사항)
		} catch (err) {
			console.error('클립보드 복사 실패:', err);
		}

		// 해당 요소로 스크롤
		const element = document.getElementById(slug);
		if (element) {
			const elementPosition = element.offsetTop;
			const offsetPosition = elementPosition - 90;
			
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	};

	return (
		<div className="group" id={slug}>
			<button
				onClick={handleAnchorClick}
				className="flex w-full cursor-pointer items-center gap-2 text-left transition-colors hover:text-gray-600 dark:hover:text-gray-300"
				aria-label="앵커 링크 복사"
			>
				<Typography variant={variant} className={className}>
					{children}
				</Typography>
				<LinkIcon
					size={16}
					className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
				/>
			</button>
		</div>
	);
}
