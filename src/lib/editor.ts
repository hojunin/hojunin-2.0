import { Editor } from '@tiptap/react';
import { Octokit } from '@octokit/rest';

const GIT_USER = 'hojunin';
const GIT_REPO = 'hojunin-2.0';
const GIT_EMAIL = 'hojunin@gmail.com';

export async function createAndPushMdxFile(editor: Editor | null, fileName: string | null) {
	// 1. Tiptap 편집기 내용을 MDX로 변환
	const mdxContent = convertToMdx(editor.getHTML());
	const token = process.env.NEXT_PUBLIC_GIT_TOKEN;

	// 2. GitHub API 클라이언트 생성
	const octokit = new Octokit({
		auth: token,
		request: {
			fetch: (url: string, options: any) => {
				const modifiedUrl = url.replace(/%2F/g, '/');
				return fetch(modifiedUrl, {
					...options,
					headers: {
						...options.headers,
						Accept: 'application/vnd.github.v3+json',
					},
				});
			},
		},
	});

	// 3. 파일 생성 및 커밋
	await octokit.repos.createOrUpdateFileContents({
		owner: GIT_USER,
		repo: GIT_REPO,
		path: `posts/${fileName}.mdx`,
		message: `📝 새로운 글을 발행합니다 : ${fileName}.mdx`,
		content: Buffer.from(mdxContent).toString('base64'),
		branch: 'main',
		committer: {
			name: GIT_USER,
			email: GIT_EMAIL,
		},
		author: {
			name: GIT_USER,
			email: GIT_EMAIL,
		},
	});
}

function convertToMdx(html: string): string {
	// HTML을 MDX로 변환하는 로직 구현
	// 이 부분은 HTML 구조에 따라 다르게 구현해야 할 수 있습니다
	// 간단한 예시:
	return html
		.replace(/<p>/g, '')
		.replace(/<\/p>/g, '\n\n')
		.replace(/<strong>/g, '**')
		.replace(/<\/strong>/g, '**')
		.replace(/<em>/g, '*')
		.replace(/<\/em>/g, '*');
}
