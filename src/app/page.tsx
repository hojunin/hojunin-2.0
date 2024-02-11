import BestContents from '@/components/home/best-contents';
import HomeCarousel from '@/components/home/carousel';
import WeeklyQuest from '@/components/home/weekly-quest';
import { Fragment } from 'react';

export default function Home() {
  return (
    <div className="mt-6">
      <HomeCarousel />
      <BestContents />
    </div>
  );
}
