import BestContents from '@/components/home/best-contents';
import NewContents from '@/components/home/new-contents';
import HomeRollingCarousel from '@/components/home/home-rolling-carousel';
import { PushNotificationManager } from '@/components/common/push-notification/push-notification-manager';
import { InstallPrompt } from '@/components/common/push-notification/install-prompt';

export default function Home() {
	return (
		<>
			<div className="container mt-6">
				<HomeRollingCarousel />

				<BestContents />

				<NewContents />
			</div>

			<>
				<PushNotificationManager />
			</>
		</>
	);
}

export const revalidate = 3600;
