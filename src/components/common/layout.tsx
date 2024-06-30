import React from 'react';
import GlobalNavigationBar from './global-naviagation-bar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<GlobalNavigationBar />

			<main className="mx-auto my-0 flex min-h-screen flex-col justify-between px-4 sm:w-2/3 sm:px-40 md:w-4/5 md:px-20">
				{children}
			</main>

			<Footer />
		</div>
	);
};

export default Layout;
