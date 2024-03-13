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
