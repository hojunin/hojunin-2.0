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
		metadata[key.trim() as keyof Metadata] = value;
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
	return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath) {
	let rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
	let mdxFiles = getMDXFiles(dir);
	return mdxFiles.map(file => {
		let { metadata, content } = readMDXFile(path.join(dir, file));
		let slug = metadata.slug;
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
