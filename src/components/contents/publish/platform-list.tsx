'use client';

import React, { useEffect, useState } from 'react';
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
import { generatePlatformContent } from '@/api/publish';

interface PlatformListProps {
	onPlatformsChange: (platforms: PlatformConfig[]) => void;
	selectedPlatforms: PlatformType[];
	onSelectedPlatformsChange: (selected: PlatformType[]) => void;
	publishedPlatforms?: Record<PlatformType, boolean>;
	onPublishPlatform?: (platform: PlatformType) => void;
	isPublishing?: boolean;
	originalContent: string;
	platformContents: Record<PlatformType, string>;
	onPlatformContentChange: (platform: PlatformType, content: string) => void;
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

const PlatformList: React.FC<PlatformListProps> = ({
	onPlatformsChange,
	selectedPlatforms,
	onSelectedPlatformsChange,
	publishedPlatforms = {},
	onPublishPlatform,
	isPublishing = false,
	originalContent,
	platformContents,
	onPlatformContentChange,
}) => {
	const [platforms, setPlatforms] = useState<PlatformConfig[]>(DEFAULT_PLATFORMS);
	const [editingPlatform, setEditingPlatform] = useState<PlatformConfig | null>(null);
	const [contentEditPlatform, setContentEditPlatform] = useState<PlatformConfig | null>(null);
	const [generating, setGenerating] = useState<Record<PlatformType, boolean>>(
		{} as Record<PlatformType, boolean>,
	);
	const [generationError, setGenerationError] = useState<string | null>(null);

	// 플랫폼 설정 로드
	useEffect(() => {
		const settings = loadPlatformSettings();
		setPlatforms(settings);
		onPlatformsChange(settings);
	}, [onPlatformsChange]);

	// 플랫폼 선택/해제
	const handleSelectPlatform = (platformId: PlatformType) => {
		if (selectedPlatforms.includes(platformId)) {
			onSelectedPlatformsChange(selectedPlatforms.filter(id => id !== platformId));
		} else {
			onSelectedPlatformsChange([...selectedPlatforms, platformId]);
		}
	};

	// 플랫폼 설정 저장
	const handleSavePlatformSettings = () => {
		if (!editingPlatform) return;

		const updatedSettings = updatePlatformSetting(editingPlatform.id, editingPlatform);
		setPlatforms(updatedSettings);
		onPlatformsChange(updatedSettings);
		setEditingPlatform(null);
	};

	// 플랫폼 발행 처리
	const handlePublishToPlatform = (platformId: PlatformType) => {
		if (onPublishPlatform) {
			onPublishPlatform(platformId);
		}
	};

	// AI로 플랫폼 콘텐츠 생성
	const generateForPlatform = async (platformId: PlatformType) => {
		if (!originalContent) {
			setGenerationError('원본 콘텐츠가 없습니다.');
			return;
		}

		setGenerating(prev => ({
			...prev,
			[platformId]: true,
		}));
		setGenerationError(null);

		try {
			const platform = platforms.find(p => p.id === platformId);
			if (!platform) return;

			const generatedContent = await generatePlatformContent(
				originalContent,
				platform.id,
				platform.prompt,
			);
			onPlatformContentChange(platform.id, generatedContent);
		} catch (error) {
			console.error(`${platformId} 콘텐츠 생성 오류:`, error);
			setGenerationError(`${platformId} 콘텐츠 생성 중 오류가 발생했습니다.`);
		} finally {
			setGenerating(prev => ({
				...prev,
				[platformId]: false,
			}));
		}
	};

	return (
		<div className="space-y-4">
			<div className="mb-4">
				<h2 className="text-xl font-semibold">발행 플랫폼</h2>
			</div>

			<div className="flex flex-col gap-4">
				{platforms.map(platform => (
					<Card
						key={platform.id}
						className={`${selectedPlatforms.includes(platform.id) ? 'ring-2 ring-primary' : ''}`}
						onClick={() => handleSelectPlatform(platform.id)}
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
															<Label htmlFor="platformContent">콘텐츠</Label>
															<Button
																variant="outline"
																size="sm"
																onClick={() => generateForPlatform(contentEditPlatform.id)}
																disabled={generating[contentEditPlatform.id] || !originalContent}
																className="flex items-center gap-2"
															>
																{generating[contentEditPlatform.id] ? (
																	<>
																		<Loader2 className="h-4 w-4 animate-spin" />
																		생성 중...
																	</>
																) : (
																	<>
																		<Sparkles className="h-4 w-4" />
																		AI로 생성
																	</>
																)}
															</Button>
														</div>
														<Textarea
															id="platformContent"
															value={platformContents[contentEditPlatform.id] || ''}
															onChange={e =>
																onPlatformContentChange(contentEditPlatform.id, e.target.value)
															}
															placeholder={`${contentEditPlatform.name}에 맞는 콘텐츠를 작성하세요`}
															rows={12}
															className="min-h-[300px]"
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
									variant="default"
									size="sm"
									disabled={publishedPlatforms[platform.id] || isPublishing}
									onClick={e => {
										e.stopPropagation();
										handlePublishToPlatform(platform.id);
									}}
									className="flex items-center gap-1"
								>
									{publishedPlatforms[platform.id] ? (
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

												<Button onClick={handleSavePlatformSettings}>저장</Button>
											</>
										)}
									</DialogContent>
								</Dialog>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default PlatformList;
