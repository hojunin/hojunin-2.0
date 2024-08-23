import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Text from '@tiptap/extension-text';
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { all, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

const content = `


글 내용
`;

const lowlight = createLowlight(all);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

export const useSettingEditor = () => {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Blockquote,
			StarterKit,
			Color,
			TextStyle,
			ListItem,
			Highlight,
			Typography,
			Image.configure({}),
			CodeBlock,
			HorizontalRule,
			CodeBlockLowlight.configure({
				lowlight,
			}),
		],
		content: content,
	});

	return editor;
};
