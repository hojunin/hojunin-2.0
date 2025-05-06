import { Date, Id, Nullable } from '@/types/common';

export const ChallengeType = {
	dev: '개발',
	reading: '독서',
	writing: '글쓰기',
} as const;

export interface Challenge {
	id: Id;
	name: string;
	type: keyof typeof ChallengeType;
	created_at: Date;
	description: string;
}

export interface UserChallenge {
	id: Id;
	created_at: Date;
	goal_count: number;
	achieved_count: number;
	year: number;
	week: number;
	challenge: Challenge;
	detail: string;
	link: Nullable<string>;
	certifying_shot: Nullable<string>;
}
