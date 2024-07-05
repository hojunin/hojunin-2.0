'use client';
import useIncrementView from './contents-detail/useIncrementView';

const ViewIncrementor = ({ slug }: { slug: string }) => {
	console.log('🚀 ~ ViewIncrementor ~ slug:', slug);
	useIncrementView(slug);
	return null;
};

export default ViewIncrementor;
