'use client';
import { useTrackPageView } from '@/hooks/events/useTrack';
import useIncrementView from './contents-detail/useIncrementView';

const ViewIncrementor = ({ slug }: { slug: string }) => {
	useTrackPageView({ title: 'content-detail' });
	useIncrementView(slug);
	return null;
};

export default ViewIncrementor;
