import { createClient } from '@/lib/supabase/client';

export const ASSET_SERVER_DOMAIN =
	'https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents';

/**
 * 파일을 업로드하고 주소를 반환합니다.
 * @param file 업로드할 파일
 * @returns 업로드된 자원의 주소
 */
export async function uploadFile(file: File) {
	const supabase = createClient();
	const filePath = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
	const { data, error } = await supabase.storage
		.from('contents')
		.upload(`${filePath}/${file.name}-${file.size}`, file);
	if (error) {
		throw error;
	}
	return `${ASSET_SERVER_DOMAIN}/${data.path}`;
}
