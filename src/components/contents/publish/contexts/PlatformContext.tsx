'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { DEFAULT_PLATFORMS, loadPlatformSettings, updatePlatformSetting } from '@/lib/platforms';
import { PlatformConfig, PlatformType } from '@/types/publish';

interface PlatformContextType {
	platforms: PlatformConfig[];
	selectedPlatforms: PlatformType[];
	publishedPlatforms: Record<PlatformType, boolean>;
	platformContents: Record<PlatformType, string>;
	setPlatforms: (platforms: PlatformConfig[]) => void;
	setSelectedPlatforms: (platforms: PlatformType[]) => void;
	setPublishedPlatforms: (platforms: Record<PlatformType, boolean>) => void;
	updatePlatformContent: (platform: PlatformType, content: string) => void;
	togglePlatformSelection: (platformId: PlatformType) => void;
	updatePlatformSettings: (platform: PlatformConfig) => void;
	setPlatformContents: (contents: Record<PlatformType, string>) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({
	children,
	initialPlatformContents = {} as Record<PlatformType, string>,
}: {
	children: ReactNode;
	initialPlatformContents?: Record<PlatformType, string>;
}) {
	const [platforms, setPlatforms] = useState<PlatformConfig[]>(DEFAULT_PLATFORMS);
	const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
	const [publishedPlatforms, setPublishedPlatforms] = useState<Record<PlatformType, boolean>>(
		{} as Record<PlatformType, boolean>,
	);
	const [platformContents, setPlatformContents] =
		useState<Record<PlatformType, string>>(initialPlatformContents);

	// 플랫폼 콘텐츠 업데이트
	const updatePlatformContent = useCallback((platform: PlatformType, content: string) => {
		setPlatformContents(prev => ({
			...prev,
			[platform]: content,
		}));
	}, []);

	// 플랫폼 선택/해제 토글
	const togglePlatformSelection = useCallback((platformId: PlatformType) => {
		setSelectedPlatforms(prev => {
			if (prev.includes(platformId)) {
				return prev.filter(id => id !== platformId);
			} else {
				return [...prev, platformId];
			}
		});
	}, []);

	// 플랫폼 설정 업데이트
	const updatePlatformSettings = useCallback((platform: PlatformConfig) => {
		const updatedSettings = updatePlatformSetting(platform.id, platform);
		setPlatforms(updatedSettings);
		return updatedSettings;
	}, []);

	// 컨텍스트 값 메모이제이션
	const value = useMemo(
		() => ({
			platforms,
			selectedPlatforms,
			publishedPlatforms,
			platformContents,
			setPlatforms,
			setSelectedPlatforms,
			setPublishedPlatforms,
			updatePlatformContent,
			togglePlatformSelection,
			updatePlatformSettings,
			setPlatformContents,
		}),
		[
			platforms,
			selectedPlatforms,
			publishedPlatforms,
			platformContents,
			updatePlatformContent,
			togglePlatformSelection,
			updatePlatformSettings,
		],
	);

	return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
	const context = useContext(PlatformContext);
	if (context === undefined) {
		throw new Error('usePlatform must be used within a PlatformProvider');
	}
	return context;
}
