'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Instagram,
	MessageCircle,
	Linkedin,
	Send,
	Mail,
	Globe,
	Settings,
	Check,
	Twitter,
	MessageSquare,
	Sparkles,
	Loader2,
	Clock,
	Brain,
	Lightbulb,
	AlertTriangle,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEFAULT_PLATFORMS, loadPlatformSettings, updatePlatformSetting } from '@/lib/platforms';
import { PlatformConfig, PlatformType } from '@/types/publish';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { streamGeneratePlatformContent } from '@/api/publish';
import { Progress } from '@/components/ui/progress';
import { Control, useFormContext, useWatch, Controller } from 'react-hook-form';

interface PlatformListProps {
	onPlatformsChange: (platforms: PlatformConfig[]) => void;
	selectedPlatforms: PlatformType[];
	onSelectedPlatformsChange: (selected: PlatformType[]) => void;
	publishedPlatforms?: Record<PlatformType, boolean>;
	onPublishPlatform?: (platform: PlatformType) => void;
	isPublishing?: boolean;
	control: Control<any>;
}

// 플랫폼 아이콘 매핑
const PlatformIcon: Record<string, React.ReactNode> = {
	instagram: <Instagram className="h-5 w-5" />,
	thread: <MessageCircle className="h-5 w-5" />,
	linkedin: <Linkedin className="h-5 w-5" />,
	telegram: <Send className="h-5 w-5" />,
	newsletter: <Mail className="h-5 w-5" />,
	blog: <Globe className="h-5 w-5" />,
	discord: <MessageSquare className="h-5 w-5" />,
	twitter: <Twitter className="h-5 w-5" />,
};

// AI 응답 상태
type GenerationStatus = 'idle' | 'waiting' | 'thinking' | 'generating' | 'completed' | 'error';

// 플랫폼 항목 컴포넌트 분리 (리렌더링 최적화)
const PlatformItem = memo(
	({
		platform,
		isSelected,
		isPublished,
		isPublishing,
		onToggleSelect,
		onPublish,
		control,
	}: {
		platform: PlatformConfig;
		isSelected: boolean;
		isPublished: boolean;
		isPublishing: boolean;
		onToggleSelect: (platformId: PlatformType) => void;
		onPublish: (platformId: PlatformType) => void;
		control: Control<any>;
	}) => {
		const { getValues, setValue } = useFormContext();
		const [editingPlatform, setEditingPlatform] = useState<PlatformConfig | null>(null);
		const [contentEditPlatform, setContentEditPlatform] = useState<PlatformConfig | null>(null);
		const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
		const [generationError, setGenerationError] = useState<string | null>(null);
		const [generatedContent, setGeneratedContent] = useState<string>('');

		// 현재 콘텐츠와 플랫폼 콘텐츠 감시
		const content = useWatch({
			control,
			name: 'content',
			defaultValue: '',
		});

		const platformContent = useWatch({
			control,
			name: `platformContents.${platform.id}`,
			defaultValue: '',
		});

		// 응답 시간 추정
		const [startTime, setStartTime] = useState<number>(0);
		const [estimatedTime, setEstimatedTime] = useState<number>(0);
		const [elapsedTime, setElapsedTime] = useState<number>(0);
		const [progressTimer, setProgressTimer] = useState<NodeJS.Timeout | null>(null);

		// 타이머 청소
		useEffect(() => {
			return () => {
				if (progressTimer) {
					clearInterval(progressTimer);
				}
			};
		}, [progressTimer]);

		// 플랫폼 설정 저장
		const handleSavePlatformSettings = useCallback(() => {
			if (!editingPlatform) return;

			const updatedSettings = updatePlatformSetting(editingPlatform.id, editingPlatform);
			setEditingPlatform(null);
		}, [editingPlatform]);

		// 진행 상태 타이머 시작
		const startProgressTimer = useCallback(() => {
			// 예상 시간 설정 (입력 콘텐츠 길이에 따라 조정)
			const contentLength = content.length;
			// 대략적으로 1000자당 5초 + 기본 3초
			const estimatedSeconds = Math.max(5, Math.min(30, Math.floor(contentLength / 1000) * 5 + 3));
			setEstimatedTime(estimatedSeconds * 1000);
			setStartTime(Date.now());
			setElapsedTime(0);

			// 진행 상태 업데이트를 위한 타이머 설정
			if (progressTimer) {
				clearInterval(progressTimer);
			}

			const timer = setInterval(() => {
				const elapsed = Date.now() - startTime;
				setElapsedTime(elapsed);

				// 예상 시간을 초과하면 타이머 중지
				if (elapsed > estimatedSeconds * 1000 + 10000) {
					// 10초 추가 버퍼
					clearInterval(timer);
					setProgressTimer(null);
				}
			}, 100);

			setProgressTimer(timer);
		}, [content, progressTimer]);

		// AI로 플랫폼 콘텐츠 생성 - 스트리밍 방식
		const generateForPlatform = useCallback(async () => {
			if (!content) {
				setGenerationError('원본 콘텐츠가 없습니다.');
				return;
			}

			setGenerationStatus('waiting');
			setGenerationError(null);
			setGeneratedContent('');

			// 진행 상태 타이머 시작
			startProgressTimer();

			try {
				// 스트리밍 API 호출
				await streamGeneratePlatformContent(
					content,
					platform.id,
					platform.prompt,
					(chunk, status) => {
						// 상태 업데이트
						if (status === 'thinking') {
							setGenerationStatus('thinking');
						} else {
							setGenerationStatus('generating');
							const updatedContent = (prev: string) => {
								const newContent = prev + chunk;
								// 업데이트된 콘텐츠를 폼 상태에 직접 저장
								setValue(`platformContents.${platform.id}`, newContent, { shouldDirty: true });
								return newContent;
							};
							setGeneratedContent(updatedContent);
						}
					},
					() => {
						// 완료 콜백
						setGenerationStatus('completed');
						if (progressTimer) {
							clearInterval(progressTimer);
							setProgressTimer(null);
						}
					},
					error => {
						// 에러 콜백
						console.error(`${platform.id} 콘텐츠 생성 오류:`, error);
						setGenerationError(`${platform.id} 콘텐츠 생성 중 오류가 발생했습니다: ${error}`);
						setGenerationStatus('error');
						if (progressTimer) {
							clearInterval(progressTimer);
							setProgressTimer(null);
						}
					},
				);
			} catch (error) {
				console.error(`${platform.id} 콘텐츠 생성 오류:`, error);
				setGenerationError(`${platform.id} 콘텐츠 생성 중 오류가 발생했습니다.`);
				setGenerationStatus('error');
				if (progressTimer) {
					clearInterval(progressTimer);
					setProgressTimer(null);
				}
			}
		}, [content, platform, progressTimer, startProgressTimer, setValue]);

		// 플레이스홀더 텍스트 가져오기
		const getPlaceholderText = useCallback(() => {
			const status = generationStatus;

			switch (status) {
				case 'waiting':
					return '연결 중... 잠시 기다려 주세요.';
				case 'thinking':
					return '생각 중... AI가 콘텐츠를 분석하고 있습니다.';
				case 'generating':
					return '생성 중... 콘텐츠가 실시간으로 작성되고 있습니다.';
				case 'error':
					return '오류가 발생했습니다. 다시 시도해 주세요.';
				default:
					return contentEditPlatform
						? `${contentEditPlatform.name}에 맞는 콘텐츠를 작성하세요`
						: '콘텐츠를 작성하세요';
			}
		}, [generationStatus, contentEditPlatform]);

		// 진행률 계산
		const calculateProgress = useCallback(() => {
			if (!estimatedTime) return 0;
			return Math.min(95, (elapsedTime / estimatedTime) * 100);
		}, [elapsedTime, estimatedTime]);

		// 남은 시간 포맷
		const formatRemainingTime = useCallback(() => {
			const remaining = Math.max(0, estimatedTime - elapsedTime);
			return `약 ${Math.ceil(remaining / 1000)}초 남음`;
		}, [estimatedTime, elapsedTime]);

		// 현재 진행 상태 아이콘
		const renderStatusIcon = useCallback(() => {
			const status = generationStatus;

			switch (status) {
				case 'waiting':
					return <Clock className="h-4 w-4 animate-pulse" />;
				case 'thinking':
					return <Brain className="h-4 w-4 animate-pulse" />;
				case 'generating':
					return <Sparkles className="h-4 w-4 animate-pulse" />;
				case 'completed':
					return <Lightbulb className="h-4 w-4" />;
				case 'error':
					return <AlertTriangle className="h-4 w-4 text-red-500" />;
				default:
					return <Sparkles className="h-4 w-4" />;
			}
		}, [generationStatus]);

		// 플랫폼 콘텐츠 변경 핸들러
		const handlePlatformContentChange = (value: string) => {
			setValue(`platformContents.${platform.id}`, value, { shouldDirty: true });
		};

		return (
			<Card
				key={platform.id}
				className={`${isSelected ? 'ring-2 ring-primary' : ''}`}
				onClick={() => onToggleSelect(platform.id)}
			>
				<CardContent className="flex items-center justify-between p-4">
					<div className="flex items-center space-x-3">
						<div className="rounded-full bg-primary/10 p-2">
							{PlatformIcon[platform.icon] || <Globe className="h-5 w-5" />}
						</div>
						<div>
							<h3 className="font-medium">{platform.name}</h3>
							{platform.requiresAuth && !platform.apiKey && (
								<p className="text-xs text-red-500">API 키 필요</p>
							)}
						</div>
					</div>

					<div className="flex items-center space-x-2">
						{/* 콘텐츠 편집 버튼 */}
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									onClick={e => {
										e.stopPropagation();
										setContentEditPlatform(platform);
										// 모달 열릴 때 생성 상태 초기화
										setGenerationStatus('idle');
										setGenerationError(null);
										setGeneratedContent('');
									}}
								>
									콘텐츠 편집
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[600px]">
								{contentEditPlatform && (
									<>
										<DialogHeader>
											<DialogTitle>{contentEditPlatform.name} 콘텐츠 편집</DialogTitle>
											<DialogDescription>
												이 플랫폼에 맞게 콘텐츠를 편집하거나 AI로 생성하세요
											</DialogDescription>
										</DialogHeader>

										<div className="space-y-4 py-4">
											<div className="space-y-2">
												<div className="flex items-center justify-between">
													<Label htmlFor={`platformContent-${platform.id}`}>콘텐츠</Label>
													<Button
														type="button"
														variant="outline"
														size="sm"
														onClick={e => {
															e.preventDefault();
															generateForPlatform();
														}}
														disabled={
															generationStatus === 'waiting' ||
															generationStatus === 'thinking' ||
															generationStatus === 'generating' ||
															!content
														}
														className="flex items-center gap-2"
													>
														{generationStatus === 'waiting' ||
														generationStatus === 'thinking' ||
														generationStatus === 'generating' ? (
															<>
																{renderStatusIcon()}
																{generationStatus === 'waiting' && '연결 중...'}
																{generationStatus === 'thinking' && '생각 중...'}
																{generationStatus === 'generating' && '생성 중...'}
															</>
														) : (
															<>
																<Sparkles className="h-4 w-4" />
																AI로 생성
															</>
														)}
													</Button>
												</div>

												{/* 진행 상태 표시 */}
												{(generationStatus === 'waiting' ||
													generationStatus === 'thinking' ||
													generationStatus === 'generating') && (
													<div className="mb-4 space-y-2">
														<Progress value={calculateProgress()} className="h-2" />
														<div className="flex justify-between text-xs text-muted-foreground">
															<span>
																{generationStatus === 'waiting' && '연결 중...'}
																{generationStatus === 'thinking' && '생각 중...'}
																{generationStatus === 'generating' && '생성 중...'}
															</span>
															<span>{formatRemainingTime()}</span>
														</div>
													</div>
												)}

												<Controller
													name={`platformContents.${platform.id}`}
													control={control}
													defaultValue=""
													render={({ field }) => (
														<Textarea
															id={`platformContent-${platform.id}`}
															value={field.value || ''}
															onChange={e => field.onChange(e.target.value)}
															placeholder={getPlaceholderText()}
															rows={12}
															className="min-h-[300px]"
															disabled={
																generationStatus === 'waiting' ||
																generationStatus === 'thinking' ||
																generationStatus === 'generating'
															}
														/>
													)}
												/>
												{generationError && (
													<div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20">
														{generationError}
													</div>
												)}
											</div>
										</div>
									</>
								)}
							</DialogContent>
						</Dialog>

						{/* 발행 버튼 */}
						<Button
							type="button"
							variant="default"
							size="sm"
							disabled={isPublished || isPublishing}
							onClick={e => {
								e.stopPropagation();
								onPublish(platform.id);
							}}
							className="flex items-center gap-1"
						>
							{isPublished ? (
								<>
									<Check className="h-4 w-4" />
									발행 완료
								</>
							) : (
								<>
									<Send className="h-4 w-4" />
									발행하기
								</>
							)}
						</Button>

						{/* 설정 버튼 */}
						<Dialog>
							<DialogTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={e => {
										e.stopPropagation();
										setEditingPlatform(platform);
									}}
								>
									<Settings className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								{editingPlatform && (
									<>
										<DialogHeader>
											<DialogTitle>{editingPlatform.name} 설정</DialogTitle>
											<DialogDescription>
												플랫폼 설정을 관리하고 API 키를 입력하세요
											</DialogDescription>
										</DialogHeader>

										<div className="space-y-4 py-4">
											<div className="space-y-2">
												<Label htmlFor="apiKey">API 키</Label>
												<Input
													id="apiKey"
													value={editingPlatform.apiKey || '환경변수에서 설정됨'}
													readOnly
													disabled
													className="bg-gray-100 dark:bg-gray-800"
												/>
												<p className="text-xs text-muted-foreground">
													API 키는 환경변수({editingPlatform.envKey})에서 관리됩니다.
												</p>
											</div>

											<div className="space-y-2">
												<Label htmlFor="prompt">AI 생성 프롬프트</Label>
												<Textarea
													id="prompt"
													value={editingPlatform.prompt}
													onChange={e =>
														setEditingPlatform({
															...editingPlatform,
															prompt: e.target.value,
														})
													}
													placeholder="플랫폼에 맞는 콘텐츠 생성을 위한 프롬프트를 입력하세요"
													rows={5}
												/>
											</div>
										</div>

										<Button type="button" onClick={handleSavePlatformSettings}>
											저장
										</Button>
									</>
								)}
							</DialogContent>
						</Dialog>
					</div>
				</CardContent>
			</Card>
		);
	},
);
PlatformItem.displayName = 'PlatformItem';

const PlatformList: React.FC<PlatformListProps> = ({
	onPlatformsChange,
	selectedPlatforms,
	onSelectedPlatformsChange,
	publishedPlatforms = {},
	onPublishPlatform,
	isPublishing = false,
	control,
}) => {
	const [platforms, setPlatforms] = useState<PlatformConfig[]>(DEFAULT_PLATFORMS);

	// 플랫폼 설정 로드
	useEffect(() => {
		const settings = loadPlatformSettings();
		setPlatforms(settings);
		onPlatformsChange(settings);
	}, [onPlatformsChange]);

	// 플랫폼 선택/해제
	const handleSelectPlatform = useCallback(
		(platformId: PlatformType) => {
			if (selectedPlatforms.includes(platformId)) {
				onSelectedPlatformsChange(selectedPlatforms.filter(id => id !== platformId));
			} else {
				onSelectedPlatformsChange([...selectedPlatforms, platformId]);
			}
		},
		[selectedPlatforms, onSelectedPlatformsChange],
	);

	// 플랫폼 발행 처리
	const handlePublishToPlatform = useCallback(
		(platformId: PlatformType) => {
			if (onPublishPlatform) {
				onPublishPlatform(platformId);
			}
		},
		[onPublishPlatform],
	);

	return (
		<div className="space-y-4">
			<div className="mb-4">
				<h2 className="text-xl font-semibold">발행 플랫폼</h2>
			</div>

			<div className="flex flex-col gap-4">
				{platforms.map(platform => (
					<PlatformItem
						key={platform.id}
						platform={platform}
						isSelected={selectedPlatforms.includes(platform.id)}
						isPublished={!!publishedPlatforms[platform.id]}
						isPublishing={isPublishing}
						onToggleSelect={handleSelectPlatform}
						onPublish={handlePublishToPlatform}
						control={control}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(PlatformList);
