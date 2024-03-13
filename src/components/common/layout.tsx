'use client';

import React from 'react';
import GlobalNavigationBar from './global-naviagation-bar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalNavigationBar />

      <main className="flex flex-col py-24 min-h-screen my-0 mx-auto justify-between px-4 md:px-20 md:w-4/5 sm:px-40 sm:w-2/3">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
