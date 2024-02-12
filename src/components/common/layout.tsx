'use client';

import React from 'react';
import GlobalNavigationBar from './global-naviagation-bar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalNavigationBar />

      <main className="flex flex-col min-h-screen my-0 mx-auto justify-between px-4 md:px-20 sm:px-40">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
