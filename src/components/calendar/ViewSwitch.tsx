import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ViewSwitchProps {
	view: 'weekly' | 'monthly';
	onViewChange: (view: 'weekly' | 'monthly') => void;
}

export function ViewSwitch({ view, onViewChange }: ViewSwitchProps) {
	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="view-switch"
				checked={view === 'monthly'}
				onCheckedChange={checked => onViewChange(checked ? 'monthly' : 'weekly')}
			/>
			<Label htmlFor="view-switch" className="text-gray-900 dark:text-gray-100">
				{view === 'weekly' ? '주간 보기' : '월간 보기'}
			</Label>
		</div>
	);
}
