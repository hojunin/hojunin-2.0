import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { isToday } from '@/lib/date';

interface MonthlyCalendarProps {
	currentDate: Date;
}

export function MonthlyCalendar({ currentDate }: MonthlyCalendarProps) {
	const startOfMonth = dayjs(currentDate).startOf('month');
	const endOfMonth = dayjs(currentDate).endOf('month');
	const startDate = startOfMonth.startOf('week');
	const endDate = endOfMonth.endOf('week');

	const calendarDays = [];
	let day = startDate;
	while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
		calendarDays.push(day);
		day = day.add(1, 'day');
	}

	return (
		<div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
			<div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
				{['일', '월', '화', '수', '목', '금', '토'].map(day => (
					<div
						key={day}
						className="border-b-2 border-gray-300 bg-white p-2 text-center font-semibold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
				{calendarDays.map((day, index) => {
					const events = [...Array(Math.floor(Math.random() * 6))];
					return (
						<div
							key={index}
							className={`relative h-24 bg-white p-2 dark:bg-gray-700 ${isToday(day) ? 'bg-primary/10' : ''}`}
						>
							<span
								className={`text-sm ${day.month() === currentDate.getMonth() ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'} ${isToday(day) ? 'flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white' : ''}`}
							>
								{day.format('D')}
							</span>
							<div className="mt-2">
								{events.length > 3 ? (
									<>
										{events.slice(0, 3).map((_, i) => (
											<Badge
												key={i}
												className="mb-1 block text-xs"
												variant={Math.random() > 0.5 ? 'default' : 'destructive'}
											>
												Event {i + 1}
											</Badge>
										))}
										<span className="text-xs text-gray-500 dark:text-gray-400">...</span>
									</>
								) : (
									events.map((_, i) => (
										<Badge
											key={i}
											className="mb-1 block text-xs"
											variant={Math.random() > 0.5 ? 'default' : 'destructive'}
										>
											Event {i + 1}
										</Badge>
									))
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
