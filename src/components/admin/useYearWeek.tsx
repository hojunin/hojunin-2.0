import { getWeekOfYear } from '@/lib/date';
import useMemoirAdminStore from '@/store/memoir-admin';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const useYearWeek = () => {
	const { currentYear, currentWeek, setYear, setWeek } = useMemoirAdminStore(state => ({
		currentYear: state.currentYear,
		currentWeek: state.currentWeek,
		setYear: state.setCurrentYear,
		setWeek: state.setCurrentWeek,
	}));
	const [standardDate, setStandardDate] = useState(dayjs().format('YYYY-MM-DD'));

	useEffect(() => {
		const [year, week] = getWeekOfYear(standardDate);
		setYear(year);
		setWeek(week);
	}, [standardDate]);

	const onClickPrevWeek = () => {
		setStandardDate(dayjs(standardDate).subtract(7, 'day').format('YYYY-MM-DD'));
	};
	const onClickNextWeek = () => {
		setStandardDate(dayjs(standardDate).add(7, 'day').format('YYYY-MM-DD'));
	};

	return { currentYear, currentWeek, onClickPrevWeek, onClickNextWeek };
};

export default useYearWeek;
