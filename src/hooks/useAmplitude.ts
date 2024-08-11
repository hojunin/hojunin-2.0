import { AmplitudeContext } from '@/context/amplitude-provider';
import { useContext } from 'react';

const useAmplitude = () => {
	const context = useContext(AmplitudeContext);
	if (context === undefined)
		throw new Error('useAmplitudeContext must be used within a AmplitudeContextProvider');
	return context;
};

export default useAmplitude;
