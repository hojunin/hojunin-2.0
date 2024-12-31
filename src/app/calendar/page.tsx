'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { addMonths, addWeeks, getWeekCountOfYear, getWeekOfYear } from '@/lib/date';
import { ViewSwitch } from '@/components/calendar/ViewSwitch';
import { CalendarNavigation } from '@/components/calendar/CalendarNavigation';
import { WeeklyCalendar } from '@/components/calendar/WeeklyCalendar';
import { MonthlyCalendar } from '@/components/calendar/MonthlyCalendar';

export default function CalendarPage() {
	const [view, setView] = useState<'weekly' | 'monthly'>('weekly');
	const [currentDate, setCurrentDate] = useState(new Date());

	const handlePrevious = () => {
		setCurrentDate(prev => (view === 'weekly' ? addWeeks(prev, -1) : addMonths(prev, -1)));
	};

	const handleNext = () => {
		setCurrentDate(prev => (view === 'weekly' ? addWeeks(prev, 1) : addMonths(prev, 1)));
	};

	const handleToday = () => {
		setCurrentDate(new Date());
	};

	const getNavigationLabel = () => {
		if (view === 'weekly') {
			const year = dayjs(currentDate).year();
			const week = getWeekCountOfYear(currentDate);
			return `${year}년 ${week} 주차`;
		} else {
			return dayjs(currentDate).format('YYYY년 MM월');
		}
	};

	return (
		<div className="container mx-auto min-h-screen bg-white p-4 dark:bg-gray-900">
			<div className="mb-4 flex items-center justify-between">
				<ViewSwitch view={view} onViewChange={setView} />
			</div>
			<CalendarNavigation
				onPrevious={handlePrevious}
				onNext={handleNext}
				onToday={handleToday}
				label={getNavigationLabel()}
			/>
			<div className="mt-4">
				{view === 'weekly' ? (
					<WeeklyCalendar currentDate={currentDate} />
				) : (
					<MonthlyCalendar currentDate={currentDate} />
				)}
			</div>
		</div>
	);
}
