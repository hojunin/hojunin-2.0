import React from 'react';
import Typography from '../common/typography';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import useDevice from '@/hooks/useDevice';

const ProfileSection = () => {
	return (
		<>
			<section className="flex w-full items-center gap-x-6">
				<Image
					src={
						'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/prod/18079523.jpeg-18679'
					}
					alt={'내 이미지'}
					width={180}
					height={180}
					className="h-24 w-24 rounded-full sm:h-40 sm:w-40"
				/>
				<div className="overflow-hidden text-ellipsis whitespace-normal">
					<Typography variant="h2">인호준</Typography>

					<Typography variant="p" className="text-sm text-muted-foreground sm:text-xs">
						<Link href="mailto:dlsghwns12@gmail.com" className="hover:text-primary hover:underline">
							Email : dlsghwns12@gmail.com
						</Link>
					</Typography>
					<Typography variant="p" className="text-sm text-muted-foreground sm:text-xs">
						<Link href="https://github.com/hojunin" className="hover:text-primary hover:underline">
							GitHub : github.com/hojunin
						</Link>
					</Typography>
					<Typography variant="p" className="text-sm text-muted-foreground sm:text-xs">
						<Link
							href="https://www.linkedin.com/in/inhojun/"
							className="hover:text-primary hover:underline"
						>
							LinkedIn : linkedin.com/in/inhojun/
						</Link>
					</Typography>
				</div>
			</section>

			<EnhancedSeparator />

			<section>
				<Typography variant="h2">About Me</Typography>

				<Typography variant="p">
					사용자 경험과 개발자 경험으로 비즈니스 가치를 창출하는 프론트엔드 개발자 인호준입니다.
				</Typography>
			</section>

			<EnhancedSeparator />

			<section className="flex flex-col gap-y-4">
				<Typography variant="h2">Work</Typography>

				<ExperienceSection title="MUSINSA">
					<Typography variant="p">
						29cm 사업부 카탈로그 팀 프론트엔드 개발자(2024.07 ~ 현재)
					</Typography>
					<Typography variant="p" className="text-muted-foreground">
						29cm의 상품 상세 페이지 및 어드민 페이지를 개발합니다. 패션 커머스의 카탈로그 도메인을
						기반으로 제품을 전달하고 있습니다.
					</Typography>
					<TechStack technologies={['react', 'typeScript', 'next.js']} />
				</ExperienceSection>

				<ExperienceSection title="겟차">
					<Typography variant="p">프론트엔드 개발자(2022.03 ~ 2023.07)</Typography>

					<Typography variant="p" className="text-muted-foreground">
						신차 구매 플랫폼 겟차의 웹, 앱 어플리케이션 개발 및 유지보수를 담당했습니다.
					</Typography>
					<TechStack technologies={['react', 'react native', 'typeScript', 'next.js']} />
				</ExperienceSection>

				<ExperienceSection title="본 아이티">
					<Typography variant="p">프론트엔드 개발자(2021.06 ~ 2022.01)</Typography>
					<Typography variant="p" className="text-muted-foreground">
						실시간 스포츠 정보공유 플랫폼 스코어본의 웹, 앱 어플리케이션 1.0 개발을 담당하여
						출시까지 경험했습니다.
					</Typography>
					<TechStack technologies={['react', 'react native', 'typeScript']} />
				</ExperienceSection>

				<ExperienceSection title="한국스마트인증">
					<Typography variant="p">풀스택 개발자(2020.08 ~ 2021.06)</Typography>
					<Typography variant="p" className="text-muted-foreground">
						블록체인 기반 익명 의사결정 아보와의 어플리케이션 개발 및 유지보수를 담당했습니다.
					</Typography>

					<TechStack technologies={['react', 'react native', 'typeScript', 'strapi']} />
				</ExperienceSection>
			</section>

			<EnhancedSeparator />

			<section className="flex flex-col gap-y-4">
				<Typography variant="h2">Experience</Typography>
				<ExperienceSection title="KDT 클라우딩 어플리케이션 과정 1, 2기 멘토(2023.12 ~ 2023.09)">
					<Typography variant="p" className="text-muted-foreground">
						웹/앱 어플리케이션 전반에 대한 하드스킬과 소프트스킬을 지도하는 역할을 맡았습니다.
						프로젝트 매니징, 코드리뷰, 진로 상담 및 간단한 강의 등을 담당했습니다.
					</Typography>
				</ExperienceSection>
			</section>
		</>
	);
};

export default ProfileSection;

const EnhancedSeparator = () => {
	return <Separator className="my-4" />;
};

const ExperienceSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-y-2 rounded-md border p-4 hover:border-gray-600">
			<Typography variant="h3" className="overflow-hidden whitespace-normal break-words">
				{title}
			</Typography>
			{children}
		</div>
	);
};

const TechStack = ({ technologies }: { technologies: string[] }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{technologies.map((tech, index) => (
				<Badge key={index} variant="secondary">
					{tech}
				</Badge>
			))}
		</div>
	);
};
