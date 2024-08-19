const fs = require('fs');
const path = require('path');

// 'posts' 폴더 경로
const directoryPath = path.join(__dirname, 'posts');

// 출력 파일 경로 및 이름
const outputFilePath = path.join(__dirname, 'slugs.js');

// 폴더 내의 파일 목록을 읽기
fs.readdir(directoryPath, (err, files) => {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}

	// 확장자를 제외한 파일명 배열 생성
	const slugList = files.map(file => path.parse(file).name);

	// 배열을 문자열로 변환
	const fileContent = `const slugList = ${JSON.stringify(slugList, null, 2)};\n\nexport default slugList;\n`;

	// 결과를 .js 파일로 저장
	fs.writeFile(outputFilePath, fileContent, err => {
		if (err) {
			return console.log('Unable to write to file: ' + err);
		}

		console.log('Slug list saved to ' + outputFilePath);
	});
});
