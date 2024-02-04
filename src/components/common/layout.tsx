'use client';

import React from 'react';
import GlobalNavigationBar from './global-naviagation-bar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalNavigationBar />
      <main className="flex flex-col min-h-screen my-0 mx-auto justify-between px-5 gap-x-5 sm:px-40 sm:flex-row sm: mt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
