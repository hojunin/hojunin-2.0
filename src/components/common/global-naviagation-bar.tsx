'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import Link from 'next/link';
import { DarkMode } from './dark-mode-button';
import { cn } from '@/lib/utils';
import UserInfoButton from '@/components/common/user-info-button';

const MENU_LINKS = [
  { label: '컨텐츠', link: '/contents' },
  {
    label: '챌린지',
    link: '/challenge',
  },
  {
    label: '내 소개',
    link: '/about',
  },
];

const GlobalNavigationBar = () => {
  return (
    <header className="flex items-center justify-between p-6 z-50 sticky top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-x-7">
        <Link href="/">
          <nav className="text-2xl font-bold tracking-tight lg:text-3xl">
            HJINN
          </nav>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {MENU_LINKS.map(({ label, link }) => (
              <NavigationMenuItem key={`${label}-${link}`}>
                <Link href={link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-x-3 ">
        <UserInfoButton />

        <DarkMode />
      </div>
    </header>
  );
};

export default GlobalNavigationBar;
