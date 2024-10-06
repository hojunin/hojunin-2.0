'use client';
import React, { useState } from 'react';
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
import SearchModal from './search-modal';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { MenuIcon } from 'lucide-react';
import useDevice from '@/hooks/useDevice';
import { Separator } from '../ui/separator';

const MENU_LINKS = [
	{ label: 'Content', link: '/contents' },
	{
		label: 'About',
		link: '/about',
	},
];

const GlobalNavigationBar = () => {
	const { isMobile } = useDevice();
	return (
		<header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border/40 bg-background/95 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex gap-x-7">
				{isMobile ? <MobileNavigationBar /> : null}
				<Link href="/">
					<nav className="text-2xl font-bold tracking-tight lg:text-3xl">HJINN</nav>
				</Link>

				{!isMobile ? <MenuNavigation /> : null}
			</div>

			<div className="flex gap-x-3">
				<SearchModal />
				<DarkMode />
			</div>
		</header>
	);
};

export default GlobalNavigationBar;

const MenuNavigation = ({ closeMobileModal }: { closeMobileModal?: () => void }) => {
	return (
		<NavigationMenu>
			<NavigationMenuList className={cn('flex', 'flex-col items-start sm:flex-row')}>
				{MENU_LINKS.map(({ label, link }) => (
					<NavigationMenuItem key={`${label}-${link}`} onClick={closeMobileModal}>
						<Link href={link} legacyBehavior passHref>
							<NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
								{label}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const MobileNavigationBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<MenuIcon />
			</SheetTrigger>
			<SheetContent className="w-1/2" side={'left'}>
				<Separator className="mt-10" />
				<MenuNavigation
					closeMobileModal={() => {
						setIsOpen(false);
					}}
				/>
			</SheetContent>
		</Sheet>
	);
};
