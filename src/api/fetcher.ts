import { ValueOf } from '@/types/common';
import { BASE_URL } from './path';

interface FetcherRequest {
	path: string;
	config?: FetchConfig;
}

export const HTTP_METHOD_TYPE = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const;

interface FetchConfig {
	method: ValueOf<typeof HTTP_METHOD_TYPE>;
	headers?: any;
	mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
	cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload';
	body?: any;
}

const defaultConfig: FetchConfig = {
	method: HTTP_METHOD_TYPE.GET,
	cache: 'force-cache',
	headers: {
		'Content-Type': 'application/json',
	},
};

/**
 * fetchApi 활용을 위한 fetcher 모듈
 * API 요청에 성공하면 response 객체를. 아니면 falsy한 값을 리턴한다.
 * @param {string} path
 * @param {FetcherRequest?} config
 * @returns {Promise<T>}
 */
export const fetcher = async <T>({ path, config }: FetcherRequest): Promise<T> => {
	try {
		const response = await fetch(`${BASE_URL}${path}`, {
			...defaultConfig,
			...config,
		});

		if (response.ok) {
			return await response.json();
		}

		return handleError(response.status, path);
	} catch (error) {
		throw error;
	}
};

const handleError = (status: number, path: string) => {
	switch (status) {
		case 401:
			throw new Error(`${path}-권한이 없음`);
		case 404:
			throw new Error(`${path}-데이터를 찾을 수 없음`);
		case 500:
			throw new Error(`${path}-서버가 응답하지 않음`);
		case 503:
			throw new Error(`${path}-서비스를 사용할 수 없음`);
		default:
			throw new Error(`${path}-알 수 없는 오류`);
	}
};
