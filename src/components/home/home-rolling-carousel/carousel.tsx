'use client';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '../../ui/badge';
import { HomeRollingBanner } from '@/types/banner';
import { useRouter } from 'next/navigation';
import Typography from '@/components/common/typography';

interface Props {
	banners: HomeRollingBanner[] | null;
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

	const onClickBanner = (path: string) => {
		if (path.includes('https://')) {
			window.open(path);
			return;
		}
		router.push(path);
	};

	if (banners === null) {
		return null;
	}

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
							onClick={() => onClickBanner(banner.click_path ?? '')}
							className="cursor-pointer"
						>
							<div className="p-1">
								<Card>
									<CardContent className="flex h-[180px] w-full flex-col items-center justify-center gap-y-4 p-6 sm:h-[270px]">
										<Typography variant="h1">{banner.title}</Typography>

										<Typography variant="h2" className="max-w-full whitespace-normal break-words">
											{banner.sub_title}
										</Typography>
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
