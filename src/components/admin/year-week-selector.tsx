'use client';
import useYearWeek from '@/components/admin/useYearWeek';
import { ArrowLeftIcon, ArrowRight } from 'lucide-react';
import React from 'react';

const YearWeekSelector = () => {
	const { currentWeek, currentYear, onClickNextWeek, onClickPrevWeek } = useYearWeek();
	return (
		<div className="flex items-center gap-x-2">
			<button className="rounded-sm border p-1" onClick={onClickPrevWeek}>
				<ArrowLeftIcon />
			</button>
			{`${currentYear}년 ${currentWeek}주차`}
			<button className="rounded-sm border p-1" onClick={onClickNextWeek}>
				<ArrowRight />
			</button>
		</div>
	);
};

export default YearWeekSelector;
