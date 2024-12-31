'use client';

import { useState } from 'react';

interface ColorItem {
	id: number;
	title: string;
	hexColor: string;
}

// 색상 데이터 생성 함수
const generateColorData = (count: number): ColorItem[] => {
	return Array.from({ length: count }, (_, index) => {
		const randomColor = Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');
		return {
			id: index + 1,
			title: `Color ${index + 1}`,
			hexColor: `#${randomColor}`,
		};
	});
};

export default function ColorList() {
	const [colors] = useState<ColorItem[]>(() => generateColorData(3000));
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const handleCheckbox = (id: number) => {
		setSelectedIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
	};

	return (
		<div className="min-h-screen p-6">
			<h1 className="mb-4 text-2xl font-bold">Color List (3000 items)</h1>
			<p className="mb-4">Selected items: {selectedIds.join(', ')}</p>

			<ul className="max-h-[calc(100vh-150px)] space-y-2 overflow-y-auto">
				{colors.map(color => (
					<li
						key={color.id}
						className="flex items-center rounded-lg bg-slate-600 p-4 shadow transition-colors hover:bg-gray-800"
					>
						<input
							type="checkbox"
							checked={selectedIds.includes(color.id)}
							onChange={() => handleCheckbox(color.id)}
							className="mr-4 h-5 w-5 cursor-pointer"
						/>
						<div className="mr-4 h-8 w-8 rounded" style={{ backgroundColor: color.hexColor }} />
						<span className="font-medium">{color.title}</span>
						<span className="ml-auto text-gray-500">{color.hexColor}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
