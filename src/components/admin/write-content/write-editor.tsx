'use client';
import './editor.css';
import { createAndPushMdxFile } from '@/lib/editor';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

import { uploadFile } from '@/api/file-upload';
import SlugEditor from './slug-editor';
import useShallowWriteAdminStore from '@/store/write-admin';
import { useSettingEditor } from './editor.hooks';
import { EditorContent } from '@tiptap/react';

const WriteEditor = () => {
	const { slug, title } = useShallowWriteAdminStore(state => state);
	const editor = useSettingEditor();

	const handleSave = async () => {
		if (!editor || !slug || !title) {
			throw new Error('글 내용과 파일 이름은 필수입니다.');
		}
		const frontMatter = `---
slug: ${slug}
title: ${title}
---
`;
		const content = editor.getHTML();
		const mdxContent = `${frontMatter}\n${content}`;
		await createAndPushMdxFile(mdxContent, slug);
	};
	if (!editor) {
		return null;
	}

	return (
		<div className="container mx-auto flex p-4">
			<div className="w-3/4 pr-4">
				<h1 className="mb-4 text-2xl font-bold">글 발행</h1>
				<SlugEditor />
				<EditorContent editor={editor} className="mb-4 min-h-[300px] border p-2" />
				<Button onClick={handleSave}>글 발행하기</Button>
			</div>
			<div className="fixed right-6 top-1/2 h-[calc(50vh-2rem)] w-1/4 -translate-y-1/2 overflow-y-auto rounded-lg bg-gray-800 p-4 shadow-lg">
				<div className="space-y-4">
					<div>
						<h3 className="mb-2 font-bold">제목</h3>
						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
								variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								H1
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
								variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								H2
							</Button>
						</div>
					</div>
					<div>
						<h3 className="mb-2 font-bold">텍스트 스타일</h3>
						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={() => editor.chain().focus().toggleBold().run()}
								variant={editor.isActive('bold') ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								굵게
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleItalic().run()}
								variant={editor.isActive('italic') ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								기울임
							</Button>
						</div>
					</div>
					<div>
						<h3 className="mb-2 font-bold">블록</h3>
						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={() => editor.chain().focus().toggleCodeBlock().run()}
								variant={editor.isActive('codeBlock') ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								코드 블록
							</Button>
							<Button
								onClick={() => editor.chain().focus().toggleBlockquote().run()}
								variant={editor.isActive('blockquote') ? 'secondary' : 'outline'}
								className="w-full text-sm"
							>
								인용구
							</Button>
						</div>
					</div>
					<div>
						<h3 className="mb-2 font-bold">색상</h3>
						<div className="grid grid-cols-3 gap-2">
							<Button
								onClick={() => editor.chain().focus().setColor('#958DF1').run()}
								className="w-full bg-[#958DF1] text-xs text-white"
							>
								보라색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#F98181').run()}
								className="w-full bg-[#F98181] text-xs text-white"
							>
								빨간색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
								className="w-full bg-[#FBBC88] text-xs text-white"
							>
								주황색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#FAF594').run()}
								className="w-full bg-[#FAF594] text-xs text-black"
							>
								노란색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
								className="w-full bg-[#70CFF8] text-xs text-white"
							>
								파란색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#94FADB').run()}
								className="w-full bg-[#94FADB] text-xs text-black"
							>
								민트색
							</Button>
							<Button
								onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
								className="w-full bg-[#B9F18D] text-xs text-black"
							>
								초록색
							</Button>
						</div>
					</div>
					<div>
						<h3 className="mb-2 font-bold">이미지</h3>
						<Input
							type="file"
							onChange={async e => {
								const fileInput = e.target;
								const file = fileInput.files[0];
								if (!file) return;
								const uploadedUrl = await uploadFile(file);
								editor.chain().focus().setImage({ src: uploadedUrl }).run();
								fileInput.value = ''; // 이미지 업로드 후 초기화
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WriteEditor;
