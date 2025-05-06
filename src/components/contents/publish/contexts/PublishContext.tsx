'use client';

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useMemo,
	ReactNode,
	useEffect,
} from 'react';
import { PlatformType, PublishRecord } from '@/types/publish';
import {
	getPublishRecords,
	createPublishRecord,
	revokePublish,
	platformPublishFunctions,
} from '@/api/publish';
import { createClient } from '@/lib/supabase/client';
import { useContent } from './ContentContext';
import { usePlatform } from './PlatformContext';

interface PublishContextType {
	publishRecords: PublishRecord[];
	loadPublishRecords: (contentId: string) => Promise<void>;
	publishToPlatform: (platformId: PlatformType) => Promise<void>;
	revokePublishRecord: (recordId: string) => Promise<void>;
}

const PublishContext = createContext<PublishContextType | undefined>(undefined);

export function PublishProvider({ children }: { children: ReactNode }) {
	const [publishRecords, setPublishRecords] = useState<PublishRecord[]>([]);
	const {
		content,
		title,
		selectedContent,
		currentContentId,
		contentStatus,
		setContentStatus,
		saveContent,
		setPublishError,
		setIsPublishing,
		isPublishing,
	} = useContent();

	const { platformContents } = usePlatform();

	// 발행 기록 로드
	const loadPublishRecords = useCallback(async (contentId: string) => {
		try {
			const records = await getPublishRecords(contentId);
			setPublishRecords(records);
		} catch (error) {
			console.error('발행 기록 로드 실패:', error);
		}
	}, []);

	// 블로그에 발행
	const publishToBlog = useCallback(
		async (content: string) => {
			try {
				if (!selectedContent) {
					return { success: false, error: '선택된 콘텐츠가 없습니다.' };
				}

				const supabase = createClient();
				const { error } = await supabase
					.from('contents')
					.update({
						title,
						content: content,
						status: 'published',
						updated_at: new Date().toISOString(),
					})
					.eq('id', selectedContent.id);

				if (error) {
					throw error;
				}

				return {
					success: true,
					url: `/contents/${selectedContent.slug}`,
				};
			} catch (error) {
				console.error('블로그 발행 실패:', error);
				return {
					success: false,
					error: String(error),
				};
			}
		},
		[selectedContent, title],
	);

	// 특정 플랫폼에 발행
	const publishToPlatform = useCallback(
		async (platformId: PlatformType) => {
			if (!content) {
				setPublishError('콘텐츠가 없습니다.');
				return;
			}

			setIsPublishing(true);
			setPublishError(null);

			try {
				// 먼저 콘텐츠 저장
				const savedContent = await saveContent();
				if (!savedContent) {
					setIsPublishing(false);
					return;
				}

				// 상태를 Complete로 변경
				if (contentStatus === 'draft') {
					await saveContent();
					setContentStatus('complete');
				}

				const platformContent = platformContents[platformId] || content;
				let publishFunction;

				// 블로그 플랫폼인 경우 새로운 함수 사용
				if (platformId === 'blog') {
					publishFunction = publishToBlog;
				} else {
					publishFunction = platformPublishFunctions[platformId];
				}

				try {
					const result = await publishFunction(platformContent);

					// 발행 기록 저장
					const record: Omit<PublishRecord, 'id'> = {
						contentId: Number(savedContent.id),
						platform: platformId,
						publishedAt: new Date(),
						status: result.success ? 'success' : 'failed',
						url: result.url,
						error: result.error,
					};

					const savedRecord = await createPublishRecord(record);
					setPublishRecords(prev => [savedRecord, ...prev]);
				} catch (error) {
					console.error(`${platformId} 발행 실패:`, error);
					setPublishError(`${platformId} 발행에 실패했습니다.`);
				}
			} catch (error) {
				console.error('발행 실패:', error);
				setPublishError('발행 중 오류가 발생했습니다.');
			} finally {
				setIsPublishing(false);
			}
		},
		[
			content,
			contentStatus,
			platformContents,
			publishToBlog,
			saveContent,
			setContentStatus,
			setIsPublishing,
			setPublishError,
		],
	);

	// 발행 취소
	const revokePublishRecord = useCallback(
		async (recordId: string) => {
			try {
				const revokedRecord = await revokePublish(recordId);
				setPublishRecords(prev =>
					prev.map(record => (record.id === revokedRecord.id ? revokedRecord : record)),
				);
			} catch (error) {
				console.error('발행 취소 실패:', error);
				setPublishError('발행 취소에 실패했습니다.');
			}
		},
		[setPublishError],
	);

	// 컨텍스트 값 메모이제이션
	const value = useMemo(
		() => ({
			publishRecords,
			loadPublishRecords,
			publishToPlatform,
			revokePublishRecord,
		}),
		[publishRecords, loadPublishRecords, publishToPlatform, revokePublishRecord],
	);

	// 현재 컨텐츠 ID가 변경되면 발행 기록 로드
	useEffect(() => {
		if (currentContentId) {
			loadPublishRecords(currentContentId.toString());
		} else {
			setPublishRecords([]);
		}
	}, [currentContentId, loadPublishRecords]);

	return <PublishContext.Provider value={value}>{children}</PublishContext.Provider>;
}

export function usePublish() {
	const context = useContext(PublishContext);
	if (context === undefined) {
		throw new Error('usePublish must be used within a PublishProvider');
	}
	return context;
}
