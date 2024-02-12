import { fetcher } from '@/api/fetcher';
import { HomeRollingBanner } from '@/types/banner';
import React from 'react';
import HomeCarousel from './carousel';

const HomeRollingCarousel = async () => {
  const banners = await fetcher<HomeRollingBanner[]>({
    path: 'banner/home-rolling',
  });

  if (!banners) return null;

  return <HomeCarousel banners={banners} />;
};

export default HomeRollingCarousel;
