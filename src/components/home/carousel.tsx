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
import { Badge } from '../ui/badge';

const bannerDummy = [
  {
    label: '새로운 컨텐츠',
  },
  {
    label: '새로운 콜라보',
  },
  {
    label: '5월 2주차 독후감',
  },
  {
    label: '5월 2주차 회고록',
  },
  {
    label: '개발이란 무엇인가?',
  },
];

const HomeCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  // https://www.embla-carousel.com/plugins/autoplay/
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

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
          {bannerDummy.map(({ label }, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-[97/28] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{label}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Badge variant="outline" className="absolute bottom-4 right-4">{`${
        currentIndex + 1
      }/${bannerDummy.length}`}</Badge>
    </div>
  );
};

export default HomeCarousel;
