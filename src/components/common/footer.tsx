import React from 'react';
import ContactSheet from './contect-sheet';

const Footer = () => {
  return (
    <footer className="px-5 py-32 min-h-fit bg-slate-600 sm:px-5 md:px-8 lg:px-24 xl:px-40">
      <p>Copyright © HOJUN IN. All rights reserved</p>

      <div className="flex flex-col gap-y-2">
        <a href="https://github.com/hojunin" target="_blank">
          깃허브
        </a>
        <a href="https://brunch.co.kr/@dlsghwns" target="_blank">
          브런치
        </a>
        <a href="https://www.linkedin.com/in/inhojun/" target="_blank">
          링크드인
        </a>
      </div>

      <ContactSheet />
    </footer>
  );
};

export default Footer;
