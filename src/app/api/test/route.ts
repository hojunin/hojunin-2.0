import { NextResponse } from 'next/server';

function generateLargeData(size: number) {
	const dataArray = [];
	for (let i = 0; i < size; i++) {
		dataArray.push({
			id: i,
			name: 'Sample Name ' + i,
			description:
				'This is a sample description to add some bulk to the object and increase its size slightly. Item number: ' +
				i,
			randomString: Math.random().toString(36).substring(2, 15),
			value: Math.floor(Math.random() * 1000),
		});
	}
	return dataArray;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	try {
		const size = searchParams.get('size') || 100000;
		const data = {
			message: '성공적으로 데이터를 가져왔습니다',
			timestamp: new Date().toISOString(),
			data: generateLargeData(Number(size)),
		};

		// 200 상태 코드와 함께 응답 반환
		const response = NextResponse.json(data, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		});

		return response;
	} catch (error) {
		// 에러 발생 시 500 상태 코드와 함께 에러 메시지 반환
		const errorResponse = NextResponse.json({ error: '서버 에러가 발생했습니다' }, { status: 500 });
		errorResponse.headers.set('Access-Control-Allow-Origin', '*');
		return errorResponse;
	}
}
