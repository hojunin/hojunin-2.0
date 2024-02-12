'use client';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '../../ui/badge';
import { HomeRollingBanner } from '@/types/banner';
import { useRouter } from 'next/navigation';

interface Props {
  banners: HomeRollingBanner[];
}

const HomeCarousel = ({ banners = [] }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  // https://www.embla-carousel.com/plugins/autoplay/
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const router = useRouter();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem
              key={index}
              onClick={() => router.push(banner.click_path)}
              className="cursor-pointer"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-[97/28] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      {banner.title}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Badge variant="outline" className="absolute bottom-4 right-4">{`${
        currentIndex + 1
      }/${banners.length}`}</Badge>
    </div>
  );
};

export default HomeCarousel;