import ProfileSection from '@/components/about/profile-section';
import React from 'react';

const AboutPage = () => {
	return (
		<div>
			<section className="flex flex-col gap-y-5 overflow-y-scroll">
				<ProfileSection />
			</section>
		</div>
	);
};

export default AboutPage;
