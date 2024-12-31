import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface CalendarNavigationProps {
	onPrevious: () => void;
	onNext: () => void;
	onToday: () => void;
	label: string;
}

export function CalendarNavigation({
	onPrevious,
	onNext,
	onToday,
	label,
}: CalendarNavigationProps) {
	return (
		<div className="mb-4 flex items-center justify-between">
			<div className="flex space-x-2">
				<Button
					variant="outline"
					size="icon"
					className="text-gray-700 dark:text-gray-300"
					onClick={onPrevious}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="text-gray-700 dark:text-gray-300"
					onClick={onNext}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
			<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{label}</h2>
			<Button
				variant="outline"
				size="sm"
				className="text-gray-700 dark:text-gray-300"
				onClick={onToday}
			>
				<RotateCcw className="mr-2 h-4 w-4" />
				오늘
			</Button>
		</div>
	);
}
