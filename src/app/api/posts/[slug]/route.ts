import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getBlogPosts, getPostContent } from '@/lib/mdx';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
	const slug = params.slug;

	try {
		// 1. 먼저 mdx.ts의 getPostContent 함수로 콘텐츠 찾기 시도 (프론트매터 슬러그 기준)
		const post = getPostContent(slug);

		if (post) {
			// 콘텐츠를 찾은 경우 반환
			return NextResponse.json({ mdxContent: post.content });
		}

		// 2. getPostContent에서 찾지 못한 경우 파일명으로 직접 찾기 시도
		const postsDirectory = path.join(process.cwd(), 'posts');
		const filenames = fs.readdirSync(postsDirectory);

		// 파일명이 슬러그와 일치하는 파일 찾기
		const mdxFile = filenames.find(filename => {
			const fileSlug = path.parse(filename).name;
			return fileSlug === slug;
		});

		if (!mdxFile) {
			return NextResponse.json({ error: 'MDX 파일을 찾을 수 없습니다' }, { status: 404 });
		}

		// MDX 파일 읽기
		const filePath = path.join(postsDirectory, mdxFile);
		const fileContent = fs.readFileSync(filePath, 'utf-8');

		// 프론트매터 제거하고 본문만 추출
		let mdxContent = fileContent;
		const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
		mdxContent = mdxContent.replace(frontmatterRegex, '').trim();

		// 콘텐츠가 비어있는지 확인
		if (!mdxContent || mdxContent.trim() === '') {
			// 파일 내용이 없는 경우 프론트매터만 있을 수 있음
			console.warn(`MDX 콘텐츠가 비어있습니다: ${slug}`);
			return NextResponse.json({ mdxContent: `<h1>${slug}</h1>` });
		}

		// 마크다운 텍스트 그대로 반환
		return NextResponse.json({ mdxContent });
	} catch (error) {
		console.error(`MDX 파일 읽기 오류 (${slug}):`, error);
		return NextResponse.json(
			{ error: '콘텐츠를 불러오는 중 오류가 발생했습니다' },
			{ status: 500 },
		);
	}
}
