import { Id } from './common';

export const ContentStatus = {
	DRAFT: 'draft',
	COMPLETE: 'complete',
	PUBLISHED: 'published',
} as const;

export type ContentStatusType = (typeof ContentStatus)[keyof typeof ContentStatus];

export const Platform = {
	INSTAGRAM: 'instagram',
	THREAD: 'thread',
	LINKEDIN: 'linkedin',
	TELEGRAM: 'telegram',
	NEWSLETTER: 'newsletter',
	BLOG: 'blog',
	DISCORD: 'discord',
	TWITTER: 'twitter',
} as const;

export type PlatformType = (typeof Platform)[keyof typeof Platform];

export interface PlatformConfig {
	id: PlatformType;
	name: string;
	icon: string;
	envKey?: string;
	enabled: boolean;
	prompt: string;
	requiresAuth: boolean;
	maxLength?: number;
	supportedMediaTypes?: string[];
	apiKey?: string;
}

export interface PublishRecord {
	id: Id;
	contentId: Id;
	platform: PlatformType;
	publishedAt: Date;
	status: 'success' | 'failed' | 'pending' | 'revoked';
	url?: string;
	error?: string;
}

export interface PublishContent {
	id: Id;
	title: string;
	content: string;
	slug?: string;
	status: ContentStatusType;
	platformContents: Record<PlatformType, string>;
}
