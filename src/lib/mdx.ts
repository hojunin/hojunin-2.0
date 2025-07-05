import fs from 'fs';
import path from 'path';
// https://yceffort.kr - blog 코드 참조
import { visit } from 'unist-util-visit';

export type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	tag: {
		label: string;
		path: string;
	};
	description: string;
	slug?: string;
};

export type HeadingItem = {
	level: number;
	text: string;
	slug: string;
};

type TokenType =
	| 'tag'
	| 'attr-name'
	| 'attr-value'
	| 'deleted'
	| 'inserted'
	| 'punctuation'
	| 'keyword'
	| 'string'
	| 'function'
	| 'boolean'
	| 'comment';

const tokenClassNames: { [key in TokenType]: string } = {
	tag: 'text-code-red',
	'attr-name': 'text-code-yellow',
	'attr-value': 'text-code-green',
	deleted: 'text-code-red',
	inserted: 'text-code-green',
	punctuation: 'text-code-white',
	keyword: 'text-code-purple',
	string: 'text-code-green',
	function: 'text-code-blue',
	boolean: 'text-code-red',
	comment: 'text-gray-400 italic',
} as const;

export function parseCodeSnippet() {
	return (tree: Node) => {
		visit(tree, 'element', (node: any) => {
			const [token, type]: [string, TokenType] = node.properties.className || [];
			if (token === 'token') {
				node.properties.className = [tokenClassNames[type]];
			}
		});
	};
}

function parseFrontmatter(fileContent: string) {
	let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	let match = frontmatterRegex.exec(fileContent);
	if (!(Array.isArray(match) && match.length > 1)) {
		return { metadata: {}, content: '' };
	}
	let frontMatterBlock = match![1];
	let content = fileContent.replace(frontmatterRegex, '').trim();
	let frontMatterLines = frontMatterBlock.trim().split('\n');
	let metadata: Partial<Metadata> = {};

	frontMatterLines.forEach(line => {
		let [key, ...valueArr] = line.split(': ');
		let value = valueArr.join(': ').trim();
		value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
		
		if (key.trim() === 'tag') {
			// tag는 문자열로 받아서 객체로 변환
			metadata[key.trim() as keyof Metadata] = {
				label: value,
				path: value.toLowerCase().replace(/\s+/g, '-')
			} as any;
		} else {
			metadata[key.trim() as keyof Metadata] = value as any;
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
	let rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
	let mdxFiles = getMDXFiles(dir);
	return mdxFiles.map(file => {
		let { metadata, content } = readMDXFile(path.join(dir, file));
		let slug = (metadata as Metadata).slug || path.basename(file, '.mdx'); // 타입 캐스팅 추가
		return {
			metadata,
			slug,
			content,
		};
	});
}

export function getBlogPosts() {
	return getMDXData(path.join(process.cwd(), 'posts'));
}

export function getPostContent(slug: string) {
	return getBlogPosts().find(post => post.slug === slug);
}

// 텍스트를 URL 친화적인 slug로 변환하는 함수 (heading-with-anchor.tsx와 동일)
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9가-힣\s-]/g, '') // 특수문자 제거 (한글 유지)
		.replace(/\s+/g, '-') // 공백을 하이픈으로
		.replace(/-+/g, '-') // 연속된 하이픈을 하나로
		.trim()
		.replace(/^-|-$/g, ''); // 시작과 끝의 하이픈 제거
}

// MDX 콘텐츠에서 heading 요소들을 추출하는 함수
export function extractHeadings(content: string): HeadingItem[] {
	const headings: HeadingItem[] = [];
	const lines = content.split('\n');
	
	lines.forEach(line => {
		const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
		if (headingMatch) {
			const level = headingMatch[1].length;
			const text = headingMatch[2].trim();
			const slug = createSlug(text);
			
			headings.push({
				level,
				text,
				slug,
			});
		}
	});
	
	return headings;
}
