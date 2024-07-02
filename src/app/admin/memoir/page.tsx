import Typography from '@/components/common/typography';
import { getWeekOfYear } from '@/lib/date';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

const MemoirAdminPage = async () => {
	const [year, week] = getWeekOfYear()
	const supabase = createClient()
	const { data:memoirs, error } = await supabase
		.from('memoir')
		.select('*, year_week(*)')
		.eq('year_week.year', year)
		.eq('year_week.week', week)

		if(error || !memoirs ){
			return <Typography variant={"h3"}>{`${year}년도 ${week}회고는 아직 없어요`}</Typography>
		}

	return <div>
		{memoirs.map(memoir => <div key={memoir.id}>
			<Typography variant="h2">{memoir.title}</Typography>
			
		</div>)
			}
	</div>;
};

export default MemoirAdminPage;
