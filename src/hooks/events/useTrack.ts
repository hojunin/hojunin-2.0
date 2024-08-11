import { useEffect } from 'react';
import useAmplitude from '../useAmplitude';

interface PageViewEvent {
	title: string;
}

export const useTrackPageView = ({ title }: PageViewEvent) => {
	const { trackAmplitudeEvent } = useAmplitude();

	useEffect(() => {
		trackAmplitudeEvent('page_viewed', {
			title,
		});
	}, []);
};

interface ComponentViewEvent {
	title: string;
}

export const useTrackComponentView = ({ title }: ComponentViewEvent) => {
	const { trackAmplitudeEvent } = useAmplitude();

	useEffect(() => {
		trackAmplitudeEvent('component_viewed', {
			title,
		});
	}, []);
};
