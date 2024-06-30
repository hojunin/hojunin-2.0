import MemoirCategoryList from '@/components/admin/memoir-category-list';
import YearWeekSelector from '@/components/admin/year-week-selector';
import { getSupabase } from '@/lib/supabase/server';
import React from 'react';

export default async function MemoirAdminLayout({ children }: { children: React.ReactNode }) {
	const supabase = getSupabase();
	if (!supabase) {
		return null;
	}
	const { data: categories, error } = await supabase.from('memoir_type').select('*');

	if (error || !categories) {
		return null;
	}

	return (
		<div>
			<div className="flex justify-between">
				<MemoirCategoryList categories={categories} />

				<YearWeekSelector />
			</div>
			<div>{children}</div>
		</div>
	);
}
