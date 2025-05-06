'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Send, AlertCircle } from 'lucide-react';
import ContentSelector from './content-selector';
import PlatformList from './platform-list';
import PublishHistory from './publish-history';
import ContentEditor from './content-editor';
import { createClient } from '@/lib/supabase/client';
import {
	createPublishContent,
	createPublishRecord,
	getPublishContent,
	getPublishRecords,
	platformPublishFunctions,
	revokePublish,
	updatePublishContent,
} from '@/api/publish';
import { loadPlatformSettings } from '@/lib/platforms';
import {
	ContentStatus,
	ContentStatusType,
	Platform,
	PlatformConfig,
	PlatformType,
	PublishContent,
	PublishRecord,
} from '@/types/publish';
import { Content } from '@/types/contents';

const PublishPage: React.FC = () => {
	// 상태 관리
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [platformContents, setPlatformContents] = useState<Record<PlatformType, string>>(
		{} as Record<PlatformType, string>,
	);
	const [contentStatus, setContentStatus] = useState<ContentStatusType>(ContentStatus.DRAFT);
	const [selectedContent, setSelectedContent] = useState<Content | null>(null);
	const [currentContentId, setCurrentContentId] = useState<number | null>(null);
	const [platforms, setPlatforms] = useState<PlatformConfig[]>([]);
	const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
	const [publishedPlatforms, setPublishedPlatforms] = useState<Record<PlatformType, boolean>>(
		{} as Record<PlatformType, boolean>,
	);
	const [publishRecords, setPublishRecords] = useState<PublishRecord[]>([]);
	const [isPublishing, setIsPublishing] = useState(false);
	const [publishError, setPublishError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// 플랫폼 설정 로드
	useEffect(() => {
		const settings = loadPlatformSettings();
		setPlatforms(settings);
	}, []);

	// 발행 기록에서 발행된 플랫폼 확인
	useEffect(() => {
		const published: Record<PlatformType, boolean> = {} as Record<PlatformType, boolean>;
		publishRecords.forEach(record => {
			if (record.status === 'success') {
				published[record.platform] = true;
			}
		});
		setPublishedPlatforms(published);
	}, [publishRecords]);

	// 컨텐츠 선택 시 콘텐츠 로드
	const handleContentSelect = async (content: Content) => {
		setSelectedContent(content);
		setTitle(content.title || '');

		try {
			// 이 컨텐츠에 대한 기존 발행 콘텐츠가 있는지 확인
			const existingContent = await getPublishContent(content.slug || '');

			if (existingContent) {
				setContent(existingContent.content);
				setPlatformContents(existingContent.platformContents);
				setContentStatus(existingContent.status);
				setCurrentContentId(existingContent.id);

				// 발행 기록 로드
				const records = await getPublishRecords(existingContent.id.toString());
				setPublishRecords(records);
			} else {
				// 새로운 콘텐츠 초기화
				// posts 폴더에서 mdx 파일 원문 가져오기
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

				setPlatformContents({} as Record<PlatformType, string>);
				setContentStatus(ContentStatus.DRAFT);
				setCurrentContentId(null);
				setPublishRecords([]);
				setPublishedPlatforms({} as Record<PlatformType, boolean>);
			}
		} catch (error) {
			console.error('콘텐츠 로드 실패:', error);
		}
	};

	// 콘텐츠 저장
	const saveContent = async () => {
		try {
			if (!title || !content) {
				setPublishError('제목과 내용은 필수입니다.');
				return;
			}

			const contentData: Omit<PublishContent, 'id'> = {
				title,
				content,
				slug: selectedContent?.slug,
				status: contentStatus,
				platformContents,
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
	};

	// 블로그에 발행
	const publishToBlog = async (content: string) => {
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
	};

	// 특정 플랫폼에만 발행
	const publishToPlatform = async (platformId: PlatformType) => {
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
			if (contentStatus === ContentStatus.DRAFT) {
				await updatePublishContent(String(savedContent.id), { status: ContentStatus.COMPLETE });
				setContentStatus(ContentStatus.COMPLETE);
			}

			const platformContent = platformContents[platformId] || content;
			let publishFunction;

			// 블로그 플랫폼인 경우 새로운 함수 사용
			if (platformId === Platform.BLOG) {
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

				// 발행 상태 업데이트
				if (result.success) {
					setPublishedPlatforms(prev => ({
						...prev,
						[platformId]: true,
					}));
					setSuccessMessage(
						`${platforms.find(p => p.id === platformId)?.name || platformId}에 발행되었습니다.`,
					);
				} else {
					setPublishError(
						`${platforms.find(p => p.id === platformId)?.name || platformId} 발행에 실패했습니다: ${result.error}`,
					);
				}
			} catch (error) {
				console.error(`${platformId} 발행 실패:`, error);
				setPublishError(`${platformId} 발행 중 오류가 발생했습니다.`);
			}

			setTimeout(() => setSuccessMessage(null), 5000);
		} catch (error) {
			console.error('발행 실패:', error);
			setPublishError('발행 중 오류가 발생했습니다.');
		} finally {
			setIsPublishing(false);
		}
	};

	// 콘텐츠 발행
	const publishContent = async () => {
		if (selectedPlatforms.length === 0) {
			setPublishError('발행할 플랫폼을 선택해주세요.');
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
			if (contentStatus === ContentStatus.DRAFT) {
				await updatePublishContent(String(savedContent.id), { status: ContentStatus.COMPLETE });
				setContentStatus(ContentStatus.COMPLETE);
			}

			// 각 플랫폼별로 발행
			const publishPromises = selectedPlatforms.map(async platformId => {
				const platformContent = platformContents[platformId] || content;
				let publishFunction;

				// 블로그 플랫폼인 경우 새로운 함수 사용
				if (platformId === Platform.BLOG) {
					publishFunction = publishToBlog;
				} else {
					publishFunction = platformPublishFunctions[platformId];
				}

				try {
					const result = await publishFunction(platformContent);

					// 발행 상태 업데이트
					if (result.success) {
						setPublishedPlatforms(prev => ({
							...prev,
							[platformId]: true,
						}));
					}

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
					return savedRecord;
				} catch (error) {
					console.error(`${platformId} 발행 실패:`, error);

					// 실패 기록 저장
					const record: Omit<PublishRecord, 'id'> = {
						contentId: Number(savedContent.id),
						platform: platformId,
						publishedAt: new Date(),
						status: 'failed',
						error: String(error),
					};

					const savedRecord = await createPublishRecord(record);
					return savedRecord;
				}
			});

			const newRecords = await Promise.all(publishPromises);
			setPublishRecords(prev => [...newRecords, ...prev]);

			// 모든 플랫폼에 성공적으로 발행되었는지 확인
			const allSuccess = newRecords.every(record => record.status === 'success');

			if (allSuccess) {
				// 상태를 Published로 변경
				await updatePublishContent(String(savedContent.id), { status: ContentStatus.PUBLISHED });
				setContentStatus(ContentStatus.PUBLISHED);
				setSuccessMessage('모든 플랫폼에 콘텐츠가 성공적으로 발행되었습니다.');
			} else {
				const successCount = newRecords.filter(record => record.status === 'success').length;
				setSuccessMessage(`${successCount}/${selectedPlatforms.length} 플랫폼에 발행되었습니다.`);
			}

			setTimeout(() => setSuccessMessage(null), 5000);
		} catch (error) {
			console.error('발행 실패:', error);
			setPublishError('발행 중 오류가 발생했습니다.');
		} finally {
			setIsPublishing(false);
		}
	};

	// 발행 철회
	const handleRevokePublish = async (recordId: string) => {
		try {
			const revokedRecord = await revokePublish(recordId);

			// 발행 기록 업데이트
			setPublishRecords(prev =>
				prev.map(record => (record.id === revokedRecord.id ? revokedRecord : record)),
			);

			// 발행된 플랫폼 상태 업데이트
			if (revokedRecord.status === 'revoked') {
				setPublishedPlatforms(prev => ({
					...prev,
					[revokedRecord.platform]: false,
				}));
			}

			setSuccessMessage('발행이 철회되었습니다.');
			setTimeout(() => setSuccessMessage(null), 3000);
		} catch (error) {
			console.error('발행 철회 실패:', error);
			setPublishError('발행 철회에 실패했습니다.');
		}
	};

	// 플랫폼 콘텐츠 변경
	const handlePlatformContentChange = (platform: PlatformType, content: string) => {
		setPlatformContents(prev => ({
			...prev,
			[platform]: content,
		}));
	};

	return (
		<div className="container mx-auto space-y-8 py-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">콘텐츠 발행</h1>
				<div className="flex gap-2">
					<Button variant="outline" onClick={saveContent} disabled={!title || !content}>
						저장하기
					</Button>
					<Button
						onClick={publishContent}
						variant="default"
						disabled={isPublishing || selectedPlatforms.length === 0 || !title || !content}
						className="flex items-center gap-2"
					>
						<Send className="h-4 w-4" />
						발행하기
					</Button>
				</div>
			</div>

			{publishError && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>오류</AlertTitle>
					<AlertDescription>{publishError}</AlertDescription>
				</Alert>
			)}

			{successMessage && (
				<Alert
					variant="default"
					className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
				>
					<AlertDescription>{successMessage}</AlertDescription>
				</Alert>
			)}

			<div className="flex flex-col space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>콘텐츠 정보</CardTitle>
						<CardDescription>콘텐츠 세부 정보를 입력하세요</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title">제목</Label>
							<Input
								id="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder="콘텐츠 제목"
							/>
						</div>

						<div className="space-y-2">
							<Label>원본 콘텐츠</Label>
							<ContentSelector onSelect={handleContentSelect} />
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="editor" className="w-full">
					<TabsList className="w-full">
						<TabsTrigger value="editor" className="flex-1">
							콘텐츠 편집
						</TabsTrigger>
						<TabsTrigger value="history" className="flex-1">
							발행 이력
						</TabsTrigger>
					</TabsList>

					<TabsContent value="editor" className="space-y-6">
						<ContentEditor
							content={content}
							onChange={setContent}
							platformContents={platformContents}
							onPlatformContentChange={handlePlatformContentChange}
							platforms={selectedPlatforms}
						/>
					</TabsContent>

					<TabsContent value="history">
						<Card>
							<CardHeader>
								<CardTitle>발행 이력</CardTitle>
								<CardDescription>발행된 플랫폼 및 상태를 확인하세요</CardDescription>
							</CardHeader>
							<CardContent>
								<PublishHistory records={publishRecords} onRevoke={handleRevokePublish} />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<Card>
					<CardHeader>
						<CardTitle>발행 설정</CardTitle>
						<CardDescription>콘텐츠를 발행할 플랫폼을 선택하세요</CardDescription>
					</CardHeader>
					<CardContent>
						<PlatformList
							onPlatformsChange={setPlatforms}
							selectedPlatforms={selectedPlatforms}
							onSelectedPlatformsChange={setSelectedPlatforms}
							publishedPlatforms={publishedPlatforms}
							onPublishPlatform={publishToPlatform}
							isPublishing={isPublishing}
							originalContent={content}
							platformContents={platformContents}
							onPlatformContentChange={handlePlatformContentChange}
						/>
					</CardContent>
					<CardFooter>
						<div className="w-full">
							<Button
								onClick={publishContent}
								variant="default"
								disabled={isPublishing || selectedPlatforms.length === 0 || !title || !content}
								className="flex w-full items-center justify-center gap-2"
							>
								<Send className="h-4 w-4" />
								{isPublishing ? '발행 중...' : '모든 플랫폼에 발행하기'}
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default PublishPage;
