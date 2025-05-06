'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { generatePlatformContent } from '@/api/publish';
import { PlatformConfig, PlatformType } from '@/types/publish';

interface AiGeneratorProps {
	originalContent: string;
	platforms: PlatformConfig[];
	selectedPlatforms: PlatformType[];
	onGeneratedContent: (platform: PlatformType, content: string) => void;
	disabled?: boolean;
}

const AiGenerator: React.FC<AiGeneratorProps> = ({
	originalContent,
	platforms,
	selectedPlatforms,
	onGeneratedContent,
	disabled = false,
}) => {
	const [generating, setGenerating] = useState<Record<PlatformType, boolean>>(
		{} as Record<PlatformType, boolean>,
	);
	const [generationError, setGenerationError] = useState<string | null>(null);

	// 선택된 모든 플랫폼에 대해 콘텐츠 생성
	const generateForAllPlatforms = async () => {
		if (!originalContent || selectedPlatforms.length === 0) {
			setGenerationError('원본 콘텐츠가 없거나 플랫폼이 선택되지 않았습니다.');
			return;
		}

		const updatedGenerating = { ...generating };
		selectedPlatforms.forEach(platform => {
			updatedGenerating[platform] = true;
		});
		setGenerating(updatedGenerating);
		setGenerationError(null);

		try {
			// 각 플랫폼별로 병렬 처리
			const generationPromises = selectedPlatforms.map(async platformId => {
				const platform = platforms.find(p => p.id === platformId);
				if (!platform) return;

				try {
					const generatedContent = await generatePlatformContent(
						originalContent,
						platform.id,
						platform.prompt,
					);
					onGeneratedContent(platform.id, generatedContent);
				} finally {
					setGenerating(prev => ({
						...prev,
						[platformId]: false,
					}));
				}
			});

			await Promise.all(generationPromises);
		} catch (error) {
			console.error('AI 생성 오류:', error);
			setGenerationError('콘텐츠 생성 중 오류가 발생했습니다.');
		}
	};

	// 특정 플랫폼에 대해서만 콘텐츠 생성
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
			onGeneratedContent(platform.id, generatedContent);
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
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">AI 콘텐츠 생성</h3>
				<Button
					onClick={generateForAllPlatforms}
					disabled={
						disabled || selectedPlatforms.length === 0 || Object.values(generating).some(Boolean)
					}
					variant="default"
					className="flex items-center gap-2"
				>
					{Object.values(generating).some(Boolean) ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							생성 중...
						</>
					) : (
						<>
							<Sparkles className="h-4 w-4" />
							전체 플랫폼 콘텐츠 생성
						</>
					)}
				</Button>
			</div>

			{generationError && (
				<div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20">
					{generationError}
				</div>
			)}

			<div className="flex flex-col gap-3">
				{selectedPlatforms.map(platformId => {
					const platform = platforms.find(p => p.id === platformId);
					if (!platform) return null;

					return (
						<Button
							key={platformId}
							onClick={() => generateForPlatform(platformId)}
							disabled={disabled || generating[platformId]}
							variant="outline"
							className="flex h-auto items-center justify-between gap-2 py-2"
						>
							<span className="text-left">{platform.name} 콘텐츠 생성</span>
							{generating[platformId] ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Sparkles className="h-4 w-4" />
							)}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default AiGenerator;
