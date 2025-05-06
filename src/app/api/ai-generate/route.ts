import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 서버 측에서만 실행되는 OpenAI 클라이언트
const openai = new OpenAI({
	apiKey: process.env.DEEPSEEK_API_KEY, // 서버 환경 변수 사용 (NEXT_PUBLIC_ 접두사 없음)
	baseURL: 'https://api.deepseek.com/v1',
});

export async function POST(request: NextRequest) {
	try {
		const { originalContent, platform, prompt } = await request.json();

		if (!originalContent || !platform || !prompt) {
			return NextResponse.json({ error: '필수 파라미터가 누락되었습니다.' }, { status: 400 });
		}

		const completion = await openai.chat.completions.create({
			model: 'deepseek-chat',
			messages: [
				{
					role: 'system',
					content: `당신은 콘텐츠를 다양한 플랫폼에 맞게 재가공하는 전문가입니다. ${platform} 플랫폼의 특성에 맞게 콘텐츠를 변환해주세요.`,
				},
				{
					role: 'user',
					content: `${prompt}\n\n원본 콘텐츠:\n${originalContent}`,
				},
			],
			temperature: 0.7,
			max_tokens: 2000,
		});

		return NextResponse.json({
			content: completion.choices[0].message.content,
		});
	} catch (error) {
		console.error('AI 콘텐츠 생성 오류:', error);
		return NextResponse.json({ error: '콘텐츠 생성 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
