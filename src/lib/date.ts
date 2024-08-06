import { Date } from '@/types/common';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
/**
 * 입력받은 날짜가 몇년도 몇주차인지 반환합니다.
 * 입력하지 않았다면 오늘 날짜로 계산합니다.
 * @param date
 */
export const getWeekOfYear = (date?: Date) => {
	let target = date;
	try {
		if (!target) {
			target = dayjs().format('YYYY-MM-DD');
		}
		return [dayjs(target).year(), dayjs(target).week()];
	} catch (error) {}
	return [2024, 1];
};

/**
 * 입력받은 날짜로부터 경과된 시간을 문자열로 반환합니다.
 * @param date 비교할 날짜
 * @returns 경과 시간을 나타내는 문자열
 */
export const getElapsedTime = (date: Date): string => {
	const now = dayjs();
	const target = dayjs(date);
	const diffYears = now.diff(target, 'year');
	const diffMonths = now.diff(target, 'month');
	const diffDays = now.diff(target, 'day');
	const diffHours = now.diff(target, 'hour');
	const diffMinutes = now.diff(target, 'minute');

	if (diffYears >= 1) {
		return target.format('YYYY-MM-DD');
	} else if (diffMonths >= 1) {
		return `${diffMonths}달 전`;
	} else if (diffDays >= 1) {
		return `${diffDays}일 전`;
	} else if (diffHours >= 1) {
		return `${diffHours}시간 전`;
	} else if (diffMinutes >= 1) {
		return `${diffMinutes}분 전`;
	} else {
		return '방금 전';
	}
};
