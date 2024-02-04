import BestContents from '@/components/home/best-contents';
import HomeCarousel from '@/components/home/carousel';
import WeeklyQuest from '@/components/home/weekly-quest';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-col flex-1 gap-y-10">
        <HomeCarousel />
        <BestContents />
      </div>

      <WeeklyQuest />
    </Fragment>
  );
}
