import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
	const slug = params.slug;

	try {
		// posts 디렉토리에서 모든 MDX 파일 목록 가져오기
		const postsDirectory = path.join(process.cwd(), 'posts');
		const filenames = fs.readdirSync(postsDirectory);

		// slug와 일치하는 파일명 찾기
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
