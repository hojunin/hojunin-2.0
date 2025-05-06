'use client';

import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { PublishRecord, PlatformType, Platform } from '@/types/publish';
import { Instagram, MessageCircle, Linkedin, Send, Mail, Globe } from 'lucide-react';

interface PublishHistoryProps {
	records: PublishRecord[];
	onRevoke: (recordId: string) => void;
}

// 플랫폼 아이콘 매핑
const PlatformIcon: Record<PlatformType, React.ReactNode> = {
	[Platform.INSTAGRAM]: <Instagram className="h-4 w-4" />,
	[Platform.THREAD]: <MessageCircle className="h-4 w-4" />,
	[Platform.LINKEDIN]: <Linkedin className="h-4 w-4" />,
	[Platform.TELEGRAM]: <Send className="h-4 w-4" />,
	[Platform.NEWSLETTER]: <Mail className="h-4 w-4" />,
	[Platform.BLOG]: <Globe className="h-4 w-4" />,
	[Platform.DISCORD]: <Send className="h-4 w-4" />,
	[Platform.TWITTER]: <Send className="h-4 w-4" />,
};

// 플랫폼 이름 매핑
const PlatformName: Record<PlatformType, string> = {
	[Platform.INSTAGRAM]: '인스타그램',
	[Platform.THREAD]: '스레드',
	[Platform.LINKEDIN]: '링크드인',
	[Platform.TELEGRAM]: '텔레그램',
	[Platform.NEWSLETTER]: '뉴스레터',
	[Platform.BLOG]: '블로그',
	[Platform.DISCORD]: '디스코드',
	[Platform.TWITTER]: '트위터',
};

// 상태 배지 스타일 매핑
const StatusBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
	success: 'default',
	failed: 'destructive',
	pending: 'secondary',
	revoked: 'outline',
};

const PublishHistory: React.FC<PublishHistoryProps> = ({ records, onRevoke }) => {
	// 날짜 포맷 함수
	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date instanceof Date ? date : new Date(date));
	};

	if (records.length === 0) {
		return <div className="py-10 text-center text-gray-500">발행 이력이 없습니다.</div>;
	}

	return (
		<div className="w-full overflow-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>플랫폼</TableHead>
						<TableHead>상태</TableHead>
						<TableHead>발행일시</TableHead>
						<TableHead className="text-right">동작</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{records.map(record => (
						<TableRow key={String(record.id)}>
							<TableCell>
								<div className="flex items-center space-x-2">
									<div>{PlatformIcon[record.platform]}</div>
									<span>{PlatformName[record.platform]}</span>
								</div>
							</TableCell>
							<TableCell>
								<Badge variant={StatusBadgeVariant[record.status]}>
									{record.status === 'success' && '성공'}
									{record.status === 'failed' && '실패'}
									{record.status === 'pending' && '진행 중'}
									{record.status === 'revoked' && '철회됨'}
								</Badge>
								{record.status === 'failed' && record.error && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<span className="ml-2 text-xs text-red-500">오류 정보</span>
											</TooltipTrigger>
											<TooltipContent>
												<p className="max-w-xs">{record.error}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
							</TableCell>
							<TableCell>{formatDate(record.publishedAt)}</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end space-x-2">
									{record.url && record.status === 'success' && (
										<Button variant="ghost" size="icon" asChild>
											<a href={record.url} target="_blank" rel="noopener noreferrer">
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
									)}
									{record.status !== 'revoked' && (
										<Button variant="ghost" size="icon" onClick={() => onRevoke(String(record.id))}>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default PublishHistory;
