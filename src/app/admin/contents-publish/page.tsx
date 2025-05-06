import PublishPage from '@/components/contents/publish';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '콘텐츠 발행 | hojun.io',
	description: '콘텐츠를 여러 플랫폼으로 발행하는 관리 페이지입니다.',
};

export default function AdminPublishPage() {
	return <PublishPage />;
}
