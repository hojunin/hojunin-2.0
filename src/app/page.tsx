import BestContents from '@/components/home/best-contents';
import HomeChallengeList from '@/components/home/home-challenge-list';
import HomeRollingCarousel from '@/components/home/home-rolling-carousel';

export default function Home() {
  return (
    <div className="mt-6">
      <HomeRollingCarousel />

      <BestContents />

      <HomeChallengeList />
    </div>
  );
}
