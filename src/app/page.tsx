import BestContents from '@/components/home/best-contents';
import NewContents from '@/components/home/home-challenge-list';
import HomeRollingCarousel from '@/components/home/home-rolling-carousel';

export default function Home() {
	return (
		<div className="container mt-6">
			<HomeRollingCarousel />

			<BestContents />

			<NewContents />
		</div>
	);
}
