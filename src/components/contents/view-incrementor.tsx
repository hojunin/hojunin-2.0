'use client';
import useIncrementView from './contents-detail/useIncrementView';

const ViewIncrementor = ({ slug }: { slug: string }) => {
	useIncrementView(slug);
	return null;
};

export default ViewIncrementor;
