import React from 'react';

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  console.log("LAYOUT")
  return (
    <div className=" dark:text-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      {children}
    </div>
  );
};

export default AboutLayout;

export const dynamic = 'error';
export const revalidate = false;
