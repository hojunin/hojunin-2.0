'use client';

import React, { useState, useEffect } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Text from '@tiptap/extension-text';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/api/file-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Platform, PlatformType } from '@/types/publish';
import { marked } from 'marked';

interface ContentEditorProps {
	content: string;
	onChange: (html: string) => void;
	platformContents: Record<PlatformType, string>;
	onPlatformContentChange: (platform: PlatformType, content: string) => void;
	platforms: PlatformType[];
}

const ContentEditor: React.FC<ContentEditorProps> = ({
	content,
	onChange,
	platformContents,
	onPlatformContentChange,
	platforms,
}) => {
	// 마크다운을 HTML로 변환하는 함수
	const convertMarkdownToHTML = (markdown: string): string => {
		try {
			// 마크다운에서 HTML로 변환
			return String(marked(markdown));
		} catch (error) {
			console.error('마크다운 변환 오류:', error);
			return markdown;
		}
	};

	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Blockquote,
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Color,
			TextStyle,
			ListItem,
			Highlight,
			Typography,
			Image.configure({}),
			CodeBlock,
			HorizontalRule,
			Placeholder.configure({
				placeholder: '내용을 입력하세요...',
			}),
		],
		content: '',
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose dark:prose-invert focus:outline-none min-h-[300px] p-4',
			},
			handleDOMEvents: {
				keydown: (view, event) => {
					// 에디터 키 이벤트를 처리하여 엔터키 문제 해결
					return false; // 기본 처리 방식 유지
				},
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	// 콘텐츠가 변경될 때 에디터 내용 업데이트
	useEffect(() => {
		if (editor && content) {
			// 이미 HTML인지 확인
			if (content.trim().startsWith('<')) {
				// HTML이면 그대로 설정
				editor.commands.setContent(content);
			} else {
				// 마크다운이면 HTML로 변환하여 설정
				const htmlContent = convertMarkdownToHTML(content);

				// 에디터 전체 내용 교체
				editor.commands.clearContent();
				editor.commands.setContent(htmlContent);

				// 커서 위치 최상단으로 이동
				editor.commands.focus('start');
			}
		}
	}, [content, editor]);

	const [activeTab, setActiveTab] = useState<string>('main');

	if (!editor) {
		return <div>로딩 중...</div>;
	}

	return (
		<div className="w-full space-y-4">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="w-full">
					<TabsTrigger value="main" className="flex-1">
						원본 콘텐츠
					</TabsTrigger>
					{platforms.map(platform => (
						<TabsTrigger key={platform} value={platform} className="flex-1">
							{platform === Platform.INSTAGRAM && '인스타그램'}
							{platform === Platform.THREAD && '스레드'}
							{platform === Platform.LINKEDIN && '링크드인'}
							{platform === Platform.TELEGRAM && '텔레그램'}
							{platform === Platform.NEWSLETTER && '뉴스레터'}
							{platform === Platform.BLOG && '블로그'}
							{platform === Platform.DISCORD && '디스코드'}
							{platform === Platform.TWITTER && '트위터(X)'}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value="main" className="mt-4">
					<div className="rounded-md border">
						<div className="mb-4 flex flex-wrap gap-2 border-b p-4 pb-4">
							<Button
								onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
								variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'}
								size="sm"
							>
								H1
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
								variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'}
								size="sm"
							>
								H2
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleBold().run()}
								variant={editor.isActive('bold') ? 'secondary' : 'outline'}
								size="sm"
							>
								굵게
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleItalic().run()}
								variant={editor.isActive('italic') ? 'secondary' : 'outline'}
								size="sm"
							>
								기울임
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleCodeBlock().run()}
								variant={editor.isActive('codeBlock') ? 'secondary' : 'outline'}
								size="sm"
							>
								코드 블록
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleBlockquote().run()}
								variant={editor.isActive('blockquote') ? 'secondary' : 'outline'}
								size="sm"
							>
								인용구
							</Button>
							<Input
								type="file"
								className="max-w-xs"
								onChange={async e => {
									const fileInput = e.target;
									const file = fileInput.files?.[0];
									if (!file) return;

									try {
										const uploadedUrl = await uploadFile(file);
										editor.chain().focus().setImage({ src: uploadedUrl }).run();
										fileInput.value = ''; // 이미지 업로드 후 초기화
									} catch (error) {
										console.error('이미지 업로드 실패:', error);
									}
								}}
							/>
						</div>
						<EditorContent editor={editor} className="prose max-w-none p-4" />
					</div>
				</TabsContent>

				{platforms.map(platform => (
					<TabsContent key={platform} value={platform} className="mt-4">
						<div className="rounded-md border p-4">
							<textarea
								className="min-h-[300px] w-full resize-none rounded-md border p-2"
								value={platformContents[platform] || ''}
								onChange={e => onPlatformContentChange(platform, e.target.value)}
								placeholder={`${platform} 플랫폼에 맞는 콘텐츠를 작성하세요`}
								rows={12}
							/>
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default ContentEditor;
