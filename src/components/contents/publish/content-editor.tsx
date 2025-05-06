'use client';

import React, { useEffect, memo, useCallback } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor, EditorContent } from '@tiptap/react';
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
import { marked } from 'marked';
import { Control, useFormContext } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface ContentEditorProps {
	content: string;
	onChange: (html: string) => void;
}

const ContentEditor = memo(({ content, onChange }: ContentEditorProps) => {
	const { setValue } = useFormContext();
	const convertMarkdownToHTML = useCallback((markdown: string): string => {
		try {
			return String(marked(markdown));
		} catch (error) {
			console.error('마크다운 변환 오류:', error);
			return markdown;
		}
	}, []);

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
				keydown: () => {
					// 에디터 키 이벤트를 처리하여 엔터키 문제 해결
					return false; // 기본 처리 방식 유지
				},
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange(html);
			setValue('content', html, { shouldDirty: true });
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
	}, [content, editor, convertMarkdownToHTML]);

	if (!editor) {
		return <Loader2 className="h-4 w-4 animate-spin" />;
	}

	return (
		<div className="w-full">
			<div className="rounded-md border">
				<div className="mb-4 flex flex-wrap gap-2 border-b p-4 pb-4">
					<Button
						type="button"
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'}
						size="sm"
					>
						H1
					</Button>
					<Button
						type="button"
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'}
						size="sm"
					>
						H2
					</Button>
					<Button
						type="button"
						onClick={() => editor.chain().focus().toggleBold().run()}
						variant={editor.isActive('bold') ? 'secondary' : 'outline'}
						size="sm"
					>
						굵게
					</Button>
					<Button
						type="button"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						variant={editor.isActive('italic') ? 'secondary' : 'outline'}
						size="sm"
					>
						기울임
					</Button>
					<Button
						type="button"
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						variant={editor.isActive('codeBlock') ? 'secondary' : 'outline'}
						size="sm"
					>
						코드 블록
					</Button>
					<Button
						type="button"
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
		</div>
	);
});

ContentEditor.displayName = 'ContentEditor';

export default ContentEditor;
