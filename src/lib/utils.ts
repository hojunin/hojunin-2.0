import { Nullable } from '@/types/common';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  wait: number = 1000,
) => {
  let timeoutId: Nullable<number> = null;
  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
