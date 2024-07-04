import React from 'react';

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mx-auto w-full max-w-3xl rounded-lg p-5 shadow-lg dark:text-white sm:p-10">
			{children}
		</div>
	);
};

export default AboutLayout;

export const dynamic = 'error';
export const revalidate = false;
