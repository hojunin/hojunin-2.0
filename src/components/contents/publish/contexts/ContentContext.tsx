'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Content } from '@/types/contents';
import { ContentStatus, ContentStatusType, PublishContent, PlatformType } from '@/types/publish';
import { getPublishContent, updatePublishContent, createPublishContent } from '@/api/publish';

interface ContentContextType {
	title: string;
	content: string;
	contentStatus: ContentStatusType;
	selectedContent: Content | null;
	currentContentId: number | null;
	isPublishing: boolean;
	publishError: string | null;
	successMessage: string | null;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setContentStatus: (status: ContentStatusType) => void;
	setSelectedContent: (content: Content | null) => void;
	setCurrentContentId: (id: number | null) => void;
	setIsPublishing: (isPublishing: boolean) => void;
	setPublishError: (error: string | null) => void;
	setSuccessMessage: (message: string | null) => void;
	handleContentSelect: (content: Content) => Promise<PublishContent | null>;
	saveContent: () => Promise<PublishContent | null>;
	resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [contentStatus, setContentStatus] = useState<ContentStatusType>(ContentStatus.DRAFT);
	const [selectedContent, setSelectedContent] = useState<Content | null>(null);
	const [currentContentId, setCurrentContentId] = useState<number | null>(null);
	const [isPublishing, setIsPublishing] = useState(false);
	const [publishError, setPublishError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// 컨텐츠 선택 처리
	const handleContentSelect = useCallback(async (content: Content) => {
		setSelectedContent(content);
		setTitle(content.title || '');

		try {
			// 이 컨텐츠에 대한 기존 발행 콘텐츠가 있는지 확인
			const existingContent = await getPublishContent(content.slug || '');

			if (existingContent) {
				setContent(existingContent.content);
				setContentStatus(existingContent.status);
				setCurrentContentId(existingContent.id);
				return existingContent;
			} else {
				// 새로운 콘텐츠 초기화
				try {
					// MDX 콘텐츠 가져오기
					const response = await fetch(`/api/posts/${content.slug}`);
					if (response.ok) {
						const { mdxContent } = await response.json();
						setContent(mdxContent || `<h1>${content.title || ''}</h1>`);
					} else {
						// 실패 시 제목만 표시
						setContent(`<h1>${content.title || ''}</h1>`);
					}
				} catch (error) {
					console.error('MDX 콘텐츠 로드 실패:', error);
					setContent(`<h1>${content.title || ''}</h1>`);
				}

				setContentStatus(ContentStatus.DRAFT);
				setCurrentContentId(null);
				return null;
			}
		} catch (error) {
			console.error('콘텐츠 로드 실패:', error);
			return null;
		}
	}, []);

	// 콘텐츠 저장
	const saveContent = useCallback(async () => {
		try {
			if (!title || !content) {
				setPublishError('제목과 내용은 필수입니다.');
				return null;
			}

			const contentData: Omit<PublishContent, 'id'> = {
				title,
				content,
				slug: selectedContent?.slug,
				status: contentStatus,
				platformContents: {} as Record<PlatformType, string>,
			};

			let savedContent: PublishContent;

			if (currentContentId) {
				// 기존 콘텐츠 업데이트
				savedContent = await updatePublishContent(String(currentContentId), contentData);
			} else {
				// 새 콘텐츠 생성
				savedContent = await createPublishContent(contentData);
				setCurrentContentId(savedContent.id);
			}

			setSuccessMessage('콘텐츠가 저장되었습니다.');
			setTimeout(() => setSuccessMessage(null), 3000);

			return savedContent;
		} catch (error) {
			console.error('콘텐츠 저장 실패:', error);
			setPublishError('콘텐츠 저장에 실패했습니다.');
			return null;
		}
	}, [title, content, selectedContent, contentStatus, currentContentId]);

	// 콘텐츠 초기화
	const resetContent = useCallback(() => {
		setTitle('');
		setContent('');
		setContentStatus(ContentStatus.DRAFT);
		setSelectedContent(null);
		setCurrentContentId(null);
		setIsPublishing(false);
		setPublishError(null);
		setSuccessMessage(null);
	}, []);

	// 컨텍스트 값 메모이제이션
	const value = useMemo(
		() => ({
			title,
			content,
			contentStatus,
			selectedContent,
			currentContentId,
			isPublishing,
			publishError,
			successMessage,
			setTitle,
			setContent,
			setContentStatus,
			setSelectedContent,
			setCurrentContentId,
			setIsPublishing,
			setPublishError,
			setSuccessMessage,
			handleContentSelect,
			saveContent,
			resetContent,
		}),
		[
			title,
			content,
			contentStatus,
			selectedContent,
			currentContentId,
			isPublishing,
			publishError,
			successMessage,
			handleContentSelect,
			saveContent,
			resetContent,
		],
	);

	return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
	const context = useContext(ContentContext);
	if (context === undefined) {
		throw new Error('useContent must be used within a ContentProvider');
	}
	return context;
}
