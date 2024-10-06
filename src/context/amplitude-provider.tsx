'use client';
import { useEffect, createContext } from 'react';
import { init, track } from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? '';

interface AmplitudeContextType {
	trackAmplitudeEvent: (eventName: string, eventProperties: Record<string, any>) => void;
}

export const AmplitudeContext = createContext<AmplitudeContextType>({
	trackAmplitudeEvent: () => {},
});

const AmplitudeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			return;
		}
		if (!AMPLITUDE_API_KEY) {
			console.error('No Amplitude API key found');
			return;
		}
		init(AMPLITUDE_API_KEY, undefined, {
			defaultTracking: {
				sessions: true,
			},
		});
	}, []);

	const trackAmplitudeEvent = (eventName: string, eventProperties: Record<string, any>): void => {
		track(eventName, eventProperties);
	};

	const value: AmplitudeContextType = { trackAmplitudeEvent };

	return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeContextProvider;
