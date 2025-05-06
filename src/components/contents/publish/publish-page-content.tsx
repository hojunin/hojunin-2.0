'use client';

import React, { useEffect, memo } from 'react';
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
import { Label } from '@/components/ui/label';
import { Send, AlertCircle } from 'lucide-react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import ContentSelector from './content-selector';
import PlatformList from './platform-list';
import PublishHistory from './publish-history';
import ContentEditor from './content-editor';
import { useContent } from './contexts/ContentContext';
import { usePlatform } from './contexts/PlatformContext';
import { usePublish } from './contexts/PublishContext';
import { loadPlatformSettings } from '@/lib/platforms';
import { Content } from '@/types/contents';
import { PlatformType } from '@/types/publish';

interface PublishFormValues {
	title: string;
	content: string;
	platformContents: Record<PlatformType, string>;
}

const PublishPageContent: React.FC = () => {
	const {
		content,
		contentStatus,
		selectedContent,
		isPublishing,
		publishError,
		successMessage,
		handleContentSelect,
		saveContent,
		setTitle,
		setContent,
	} = useContent();

	const {
		platforms,
		selectedPlatforms,
		publishedPlatforms,
		platformContents,
		setPlatforms,
		setSelectedPlatforms,
		updatePlatformContent,
	} = usePlatform();

	const { publishRecords, publishToPlatform, revokePublishRecord } = usePublish();

	// react-hook-form 설정
	const methods = useForm<PublishFormValues>({
		defaultValues: {
			title: '',
			content: '',
			platformContents: {} as Record<PlatformType, string>,
		},
	});

	// 기존 값으로 폼 초기화
	useEffect(() => {
		if (selectedContent) {
			methods.setValue('title', selectedContent.title || '');
		}
	}, [selectedContent, methods]);

	useEffect(() => {
		methods.setValue('content', content);
	}, [content, methods]);

	useEffect(() => {
		methods.setValue('platformContents', platformContents);
	}, [platformContents, methods]);

	// 폼 제출 처리
	const onSubmit = async (data: PublishFormValues) => {
		// 입력 데이터 콘텍스트에 반영
		setTitle(data.title);
		setContent(data.content);
		Object.entries(data.platformContents).forEach(([platform, content]) => {
			updatePlatformContent(platform as PlatformType, content);
		});

		// 저장 및 발행 처리
		await saveContent();

		// 각 플랫폼별로 발행
		for (const platformId of selectedPlatforms) {
			await publishToPlatform(platformId);
		}
	};

	// 플랫폼 설정 로드
	useEffect(() => {
		const settings = loadPlatformSettings();
		setPlatforms(settings);
	}, [setPlatforms]);

	// 개별 플랫폼에 발행
	const handlePublishToPlatform = async (platformId: PlatformType) => {
		// 먼저 현재 폼 데이터를 콘텍스트에 반영
		const data = methods.getValues();
		setTitle(data.title);
		setContent(data.content);

		// 플랫폼 발행
		await publishToPlatform(platformId);
	};

	const handleSelectContent = async (content: Content) => {
		// 컨텐츠 선택 처리
		const result = await handleContentSelect(content);

		// 선택한 컨텐츠의 데이터로 폼 업데이트
		if (result) {
			methods.setValue('title', result.title);
			methods.setValue('content', result.content);
			methods.setValue('platformContents', result.platformContents);
		} else if (content) {
			methods.setValue('title', content.title || '');
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="container mx-auto space-y-8 py-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">콘텐츠 발행</h1>
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => methods.handleSubmit(onSubmit)()}
							disabled={!methods.watch('title') || !methods.watch('content')}
						>
							저장하기
						</Button>
						<Button
							type="submit"
							variant="default"
							disabled={
								isPublishing ||
								selectedPlatforms.length === 0 ||
								!methods.watch('title') ||
								!methods.watch('content')
							}
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
								<Controller
									name="title"
									control={methods.control}
									render={({ field }) => <Input id="title" {...field} placeholder="콘텐츠 제목" />}
								/>
							</div>

							<div className="space-y-2">
								<Label>원본 콘텐츠</Label>
								<ContentSelector onSelect={handleSelectContent} />
							</div>
						</CardContent>
					</Card>

					{/* 원본 콘텐츠 에디터 */}
					<ContentEditorSection control={methods.control} />

					{/* 발행 설정 */}
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
								onPublishPlatform={handlePublishToPlatform}
								isPublishing={isPublishing}
								control={methods.control}
							/>
						</CardContent>
						<CardFooter>
							<div className="w-full">
								<Button
									type="submit"
									variant="default"
									disabled={
										isPublishing ||
										selectedPlatforms.length === 0 ||
										!methods.watch('title') ||
										!methods.watch('content')
									}
									className="flex w-full items-center justify-center gap-2"
								>
									<Send className="h-4 w-4" />
									{isPublishing ? '발행 중...' : '모든 플랫폼에 발행하기'}
								</Button>
							</div>
						</CardFooter>
					</Card>

					{/* 발행 이력 */}
					<Card>
						<CardHeader>
							<CardTitle>발행 이력</CardTitle>
							<CardDescription>발행된 플랫폼 및 상태를 확인하세요</CardDescription>
						</CardHeader>
						<CardContent>
							<PublishHistory records={publishRecords} onRevoke={revokePublishRecord} />
						</CardContent>
					</Card>
				</div>
			</form>
		</FormProvider>
	);
};

// 콘텐츠 에디터 컴포넌트 분리 (리렌더링 최적화)
const ContentEditorSection = memo(({ control }: { control: any }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>콘텐츠 편집</CardTitle>
				<CardDescription>원본 콘텐츠를 편집하세요</CardDescription>
			</CardHeader>
			<CardContent>
				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<ContentEditor content={field.value} onChange={field.onChange} control={control} />
					)}
				/>
			</CardContent>
		</Card>
	);
});
ContentEditorSection.displayName = 'ContentEditorSection';

export default PublishPageContent;
