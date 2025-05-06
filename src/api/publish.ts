import { createClient } from '@supabase/supabase-js';
import { Platform, PlatformType, PublishContent, PublishRecord } from '@/types/publish';

// Supabase 클라이언트 초기화
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

// 콘텐츠 관련 API
export async function getPublishContents(): Promise<PublishContent[]> {
	const { data, error } = await supabase
		.from('publish_contents')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;

	return data.map(item => ({
		...item,
		platformContents: item.platform_contents,
	}));
}

export async function getPublishContent(slug: string): Promise<PublishContent | null> {
	const { data, error } = await supabase
		.from('publish_contents')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) {
		if (error.code === 'PGRST116') return null; // 결과가 없는 경우
		throw error;
	}

	return {
		...data,
		platformContents: data.platform_contents,
	};
}

export async function createPublishContent(
	content: Omit<PublishContent, 'id'>,
): Promise<PublishContent> {
	const { data, error } = await supabase
		.from('publish_contents')
		.insert({
			title: content.title,
			content: content.content,
			slug: content.slug,
			status: content.status,
			platform_contents: content.platformContents,
		})
		.select()
		.single();

	if (error) throw error;

	return {
		...data,
		platformContents: data.platform_contents,
	};
}

export async function updatePublishContent(
	id: string,
	data: Partial<PublishContent>,
): Promise<PublishContent> {
	const updateData: any = { ...data };

	// platformContents를 platform_contents로 변환
	if (data.platformContents) {
		updateData.platform_contents = data.platformContents;
		delete updateData.platformContents;
	}

	const { data: updatedData, error } = await supabase
		.from('publish_contents')
		.update(updateData)
		.eq('id', id)
		.select()
		.single();

	if (error) throw error;

	return {
		...updatedData,
		platformContents: updatedData.platform_contents,
	};
}

// 발행 기록 관련 API
export async function getPublishRecords(contentId?: string): Promise<PublishRecord[]> {
	let query = supabase
		.from('publish_records')
		.select('*')
		.order('published_at', { ascending: false });

	if (contentId) {
		query = query.eq('content_id', contentId);
	}

	const { data, error } = await query;

	if (error) throw error;

	return data.map(record => ({
		...record,
		contentId: record.content_id,
		publishedAt: record.published_at,
	}));
}

export async function createPublishRecord(
	record: Omit<PublishRecord, 'id'>,
): Promise<PublishRecord> {
	const { data, error } = await supabase
		.from('publish_records')
		.insert({
			content_id: record.contentId,
			platform: record.platform,
			published_at: record.publishedAt,
			status: record.status,
			url: record.url,
			error: record.error,
		})
		.select()
		.single();

	if (error) throw error;

	return {
		...data,
		contentId: data.content_id,
		publishedAt: data.published_at,
	};
}

export async function revokePublish(recordId: string): Promise<PublishRecord> {
	const { data, error } = await supabase
		.from('publish_records')
		.update({ status: 'revoked' })
		.eq('id', recordId)
		.select()
		.single();

	if (error) throw error;

	return {
		...data,
		contentId: data.content_id,
		publishedAt: data.published_at,
	};
}

// DeepSeek API를 통한 콘텐츠 생성 (서버 API 엔드포인트 사용)
export async function generatePlatformContent(
	originalContent: string,
	platform: PlatformType,
	prompt: string,
): Promise<string> {
	try {
		const response = await fetch('/api/ai-generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				originalContent,
				platform,
				prompt,
			}),
		});

		if (!response.ok) {
			throw new Error(`API 요청 실패: ${response.status}`);
		}

		const data = await response.json();
		return data.content || `${platform}용 콘텐츠 생성에 실패했습니다.`;
	} catch (error) {
		console.error('AI 콘텐츠 생성 오류:', error);
		return `${platform}용 콘텐츠 생성에 실패했습니다.`;
	}
}

// 스트리밍 방식으로 AI 콘텐츠 생성 (서버 API 엔드포인트 사용)
export async function streamGeneratePlatformContent(
	originalContent: string,
	platform: PlatformType,
	prompt: string,
	onChunk: (chunk: string, status?: string) => void,
	onDone: () => void,
	onError: (error: string) => void,
): Promise<void> {
	try {
		const response = await fetch('/api/ai-generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				originalContent,
				platform,
				prompt,
			}),
		});

		if (!response.ok) {
			throw new Error(`API 요청 실패: ${response.status}`);
		}

		// 응답이 스트림인지 확인
		if (!response.body) {
			throw new Error('응답 스트림을 받을 수 없습니다.');
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let buffer = '';

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				break;
			}

			// 청크를 텍스트로 변환하고 버퍼에 추가
			buffer += decoder.decode(value, { stream: true });

			// 버퍼에서 완전한 JSON 객체 찾기
			const chunks = buffer.split('\n\n');
			buffer = chunks.pop() || ''; // 불완전한 마지막 청크는 버퍼에 남김

			for (const chunk of chunks) {
				if (!chunk.trim()) continue;

				try {
					const parsed = JSON.parse(chunk);

					if (parsed.status === 'thinking') {
						// 사고 중 상태 - 진행 중임을 표시
						onChunk('', 'thinking');
					} else if (parsed.status === 'done') {
						// 완료 상태
						onDone();
					} else if (parsed.error) {
						// 오류 발생
						onError(parsed.error);
					} else if (parsed.content) {
						// 콘텐츠 청크 전달
						onChunk(parsed.content);
					}
				} catch (e) {
					console.error('JSON 파싱 오류:', e, 'raw:', chunk);
				}
			}
		}

		// 남은 버퍼 처리
		if (buffer.trim()) {
			try {
				const parsed = JSON.parse(buffer);
				if (parsed.content) {
					onChunk(parsed.content);
				} else if (parsed.status === 'done') {
					onDone();
				} else if (parsed.error) {
					onError(parsed.error);
				}
			} catch (e) {
				console.error('최종 JSON 파싱 오류:', e, 'raw:', buffer);
			}
		}

		onDone();
	} catch (error) {
		console.error('AI 콘텐츠 스트리밍 오류:', error);
		onError(error instanceof Error ? error.message : String(error));
	}
}

// 각 플랫폼별 발행 함수들
export async function publishToInstagram(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Instagram API 연동 코드 구현
	console.log('Instagram에 발행:', content);
	return { success: true, url: 'https://instagram.com/post/123' };
}

export async function publishToThread(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Thread API 연동 코드 구현
	console.log('Thread에 발행:', content);
	return { success: true, url: 'https://threads.net/post/123' };
}

export async function publishToLinkedIn(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 LinkedIn API 연동 코드 구현
	console.log('LinkedIn에 발행:', content);
	return { success: true, url: 'https://linkedin.com/post/123' };
}

export async function publishToTelegram(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Telegram API 연동 코드 구현
	console.log('Telegram에 발행:', content);
	return { success: true, url: 'https://t.me/channel/123' };
}

export async function publishToNewsletter(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Newsletter API 연동 코드 구현
	console.log('Newsletter에 발행:', content);
	return { success: true };
}

export async function publishToBlog(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Blog API 연동 코드 구현
	console.log('Blog에 발행:', content);
	return { success: true, url: 'https://blog.example.com/post/123' };
}

export async function publishToDiscord(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Discord API 연동 코드 구현
	console.log('Discord에 발행:', content);
	return { success: true, url: 'https://discord.com/channels/123/456' };
}

export async function publishToTwitter(
	content: string,
): Promise<{ success: boolean; url?: string; error?: string }> {
	// 여기에 Twitter API 연동 코드 구현
	console.log('Twitter(X)에 발행:', content);
	return { success: true, url: 'https://twitter.com/user/status/123' };
}

// 플랫폼별 발행 함수 매핑
export const platformPublishFunctions: Record<
	PlatformType,
	(content: string) => Promise<{ success: boolean; url?: string; error?: string }>
> = {
	[Platform.INSTAGRAM]: publishToInstagram,
	[Platform.THREAD]: publishToThread,
	[Platform.LINKEDIN]: publishToLinkedIn,
	[Platform.TELEGRAM]: publishToTelegram,
	[Platform.NEWSLETTER]: publishToNewsletter,
	[Platform.BLOG]: publishToBlog,
	[Platform.DISCORD]: publishToDiscord,
	[Platform.TWITTER]: publishToTwitter,
};
