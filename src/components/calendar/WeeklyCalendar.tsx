import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { getWeekDates, isToday } from '@/lib/date';

interface WeeklyCalendarProps {
	currentDate: Date;
}

export function WeeklyCalendar({ currentDate }: WeeklyCalendarProps) {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const weekDates = getWeekDates(currentDate);

	return (
		<div className="min-h-[40rem] overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
			<div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
				{days.map(day => (
					<div
						key={day}
						className="border-b-2 border-gray-300 bg-white p-2 text-center font-semibold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
				{weekDates.map((date, index) => (
					<div
						key={index}
						className={`bg-white p-4 dark:bg-gray-700 ${isToday(date) ? 'bg-primary/10' : ''}`}
					>
						<div className="text-center">
							<div className="font-semibold text-gray-900 dark:text-gray-100">{days[index]}</div>
							<div
								className={`mt-1 text-lg ${isToday(date) ? 'mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
							>
								{dayjs(date).format('D')}
							</div>
						</div>
						<div className="mt-4 space-y-2">
							{[...Array(Math.floor(Math.random() * 6))].map((_, i) => (
								<Badge
									key={i}
									className="w-full justify-center"
									variant={Math.random() > 0.5 ? 'default' : 'destructive'}
								>
									Event {i + 1}
								</Badge>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
