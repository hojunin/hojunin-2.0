'use server';

import webpush from 'web-push';

webpush.setVapidDetails(
	'mailto:dlsghwns@naver.com',
	process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
	process.env.VAPID_PRIVATE_KEY!,
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
	subscription = sub;
	// In a production environment, you would want to store the subscription in a database
	// For example: await db.subscriptions.create({ data: sub })
	return { success: true };
}

export async function unsubscribeUser() {
	subscription = null;
	// In a production environment, you would want to remove the subscription from the database
	// For example: await db.subscriptions.delete({ where: { ... } })
	return { success: true };
}

export async function sendNotification(message: string, subsObj: PushSubscription) {
	if (!subsObj) {
		throw new Error('구독 객체가 없음');
	}

	try {
		await webpush.sendNotification(
			subsObj,
			JSON.stringify({
				title: 'Test Notification',
				body: message,
				icon: '/apple-icon.png',
			}),
		);
		return { success: true };
	} catch (error) {
		console.error('Error sending push notification:', error);
		return { success: false, error: 'Failed to send notification' };
	}
}