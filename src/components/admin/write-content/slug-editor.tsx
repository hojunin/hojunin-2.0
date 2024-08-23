import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useShallowWriteAdminStore from '@/store/write-admin';
import React from 'react';

const SlugEditor = () => {
	const { slug, title, setSlug, setTitle } = useShallowWriteAdminStore(state => state);
	return (
		<div>
			<div className="mb-4 flex items-center">
				<Label className="mr-4 whitespace-nowrap" htmlFor="slug">
					슬러그
				</Label>
				<Input
					id="slug"
					type="text"
					value={slug}
					onChange={e => setSlug(e.target.value)}
					placeholder="slug를 입력하세요"
				/>
			</div>
			<div className="mb-4 flex items-center">
				<Label className="mr-4 whitespace-nowrap" htmlFor="title">
					제목
				</Label>
				<Input
					id="title"
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="제목을 입력하세요"
				/>
			</div>
		</div>
	);
};

export default SlugEditor;
