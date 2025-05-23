import { Platform, PlatformConfig, PlatformType } from '@/types/publish';

// 각 플랫폼별 기본 프롬프트
const PLATFORM_PROMPTS: Record<PlatformType, string> = {
	[Platform.INSTAGRAM]:
		'인스타그램은 시각적 콘텐츠와 짧은 텍스트가 중요합니다. 해시태그를 포함하고, 간결하고 시각적으로 매력적인 내용으로 변환해주세요. 최대 2,200자까지 사용할 수 있습니다.\n\n원문 출처는 "원문 보기: [링크]" 형식으로 마지막에 추가해주세요. 문단 구분이 필요할 때는 Enter를 두 번 사용해서 확실히 구분해주세요. 카드뉴스 형식으로 만들 때는 각 이미지에 들어갈 내용을 [카드1], [카드2] 등으로 구분해주세요.\n\n예시:\n✨오늘의 코딩 인사이트✨\n\n프로그래밍에서 가장 중요한 것은 문제 해결 능력! 복잡한 문제를 작은 단위로 나누어 생각하면 어떤 문제든 해결할 수 있어요 💻\n\n#코딩 #개발자 #프로그래밍팁\n\n원문 보기: https://example.com/article\n\n또 다른 예시:\n🚀 새로운 프로젝트 시작했어요! 🚀\n\n이번에는 머신러닝을 활용한 개인화 추천 시스템을 개발 중입니다. 매일 조금씩 진행상황을 공유할게요! \n\n첫 번째 단계는 데이터 수집과 전처리... 생각보다 재밌지만 꽤 도전적인 과제네요 😅\n\n#개발자일상 #머신러닝 #추천시스템 #코딩\n\n카드뉴스 예시:\n[카드1]\n📚 개발자의 성장을 위한 책 추천 📚\n\n[카드2]\n1️⃣ 클린 코드 (로버트 마틴)\n- 코드 가독성과 유지보수성 향상을 위한 필수 도서\n\n[카드3]\n2️⃣ 리팩토링 (마틴 파울러)\n- 기존 코드를 개선하는 체계적인 방법 학습\n\n[카드4]\n3️⃣ 실용주의 프로그래머 (앤드류 헌트, 데이비드 토마스)\n- 실무에서 바로 적용할 수 있는 개발 지혜',

	[Platform.THREAD]:
		'Thread는 Twitter의 확장으로, 간결하고 대화형 콘텐츠가 적합합니다. 최대 500자 정도로 핵심 메시지만 담아주세요. 해시태그는 1-2개만 사용하세요. 원문 링크는 가능하면 마지막에 포함해 주세요.\n\n예시:\n프로그래밍에서 가장 중요한 건 문제 해결 능력이죠. 오늘도 복잡한 버그와 씨름하는 여러분 모두 화이팅입니다! 어려운 문제일수록 작게 나누어 접근하세요. 하나씩 해결되는 쾌감이 개발의 재미죠. #개발자일상\n\n원문: https://example.com/article\n\n또 다른 예시:\n오늘 React에서 useEffect를 잘못 사용해서 무한 루프에 빠져버렸어요 😱 콘솔에 에러가 쏟아지는 걸 보고 정신이 아찔했죠. 의존성 배열을 제대로 설정하는 것의 중요성을 다시 한 번 깨달은 하루였습니다. 여러분은 어떤 실수로 교훈을 얻으셨나요? #리액트개발',

	[Platform.LINKEDIN]:
		'LinkedIn은 전문적인 네트워킹 플랫폼입니다. 업계 인사이트, 전문 지식, 경험을 공유하는 내용으로 작성해주세요. 전문 용어를 적절히 사용하고, 비즈니스 관련 통찰력을 제공하세요. 최대 3,000자까지 사용할 수 있습니다. 원문 링크는 마지막에 "원문 보기: [링크]" 형식으로 추가해주세요.\n\n예시:\n[소프트웨어 개발에서의 효율적인 문제 해결 접근법]\n\n오늘 팀과 함께 복잡한 성능 이슈를 해결하며 다시 한번 체계적인 문제 해결 프로세스의 중요성을 실감했습니다. 특히 대규모 시스템에서는 다음 접근법이 효과적이었습니다:\n\n1. 명확한 문제 정의: 증상이 아닌 근본 원인을 찾기 위한 첫걸음\n2. 데이터 기반 분석: 가정이 아닌 측정된 데이터로 의사결정\n3. 점진적 접근: 한 번에 한 가지 변수만 수정하여 영향 평가\n\n이러한 방법론을 통해 우리 팀은 서비스 응답 시간을 68% 개선했으며, 사용자 경험을 크게 향상시켰습니다.\n\n여러분은 어떤 문제 해결 방법론을 선호하시나요? 의견을 공유해 주세요.\n\n원문 보기: https://example.com/article\n\n또 다른 예시:\n[5년간의 원격 근무 경험에서 배운 생산성 향상 전략]\n\n2019년부터 시작한 원격 근무가 어느덧 5년 차에 접어들었습니다. 이 기간 동안 효율성을 극대화하기 위해 다양한 전략을 시도했고, 팀 전체의 생산성을 30% 이상 향상시킬 수 있었습니다.\n\n가장 효과적이었던 3가지 전략을 공유합니다:\n\n1. 비동기 커뮤니케이션 최적화: 실시간 미팅은 주 2회로 제한하고, 대부분의 소통은 문서화된 형태로 진행합니다. 이를 통해 깊은 집중의 시간을 확보하고 시간대가 다른 글로벌 팀과도 효과적으로 협업할 수 있었습니다.\n\n2. 성과 중심 문화 구축: 출석이나 근무 시간보다 실제 결과물에 초점을 맞추는 문화를 만들었습니다. 명확한 OKR 설정과 정기적인 진행 상황 공유가 핵심이었습니다.\n\n3. 디지털 웰빙 우선순위화: 번아웃 방지를 위해 팀 전체가 디지털 디톡스 시간을 갖도록 장려했습니다. 특히 금요일 오후는 "딥 워크" 시간으로 지정하여 회의나 채팅 없이 집중할 수 있는 환경을 조성했습니다.\n\n원격 근무의 효율성에 대한 여러분의 경험이나 전략이 있으시면 댓글로 공유해주세요. 함께 성장하는 커뮤니티를 만들어 갑시다.\n\n원문 보기: https://example.com/article',

	[Platform.TELEGRAM]:
		'Telegram은 다양한 형식의 콘텐츠를 지원하는 메시징 앱입니다. 텍스트 서식(볼드, 이탤릭, 링크 등)을 활용하고, 명확한 문단 구분으로 가독성 좋게 변환해주세요. 긴 내용도 가능하지만 핵심 내용을 먼저 전달하는 것이 중요합니다. 원문 링크는 "원문: [링크]" 형식으로 마지막에 추가해주세요.\n\n예시:\n**🚀 개발자 생산성 향상 팁**\n\n안녕하세요, 개발자 여러분! 오늘은 코딩 효율성을 높이는 몇 가지 팁을 공유합니다:\n\n1. *키보드 단축키 마스터하기*: IDE의 주요 단축키 5개만 외워도 생산성이 크게 향상됩니다.\n2. *포모도로 기법 활용*: 25분 집중, 5분 휴식의 사이클로 지속적인 생산성 유지\n3. *자동화 스크립트 작성*: 반복 작업은 자동화하여 시간 절약\n\n더 자세한 내용은 [블로그 포스트](https://example.com)를 참고하세요.\n\n여러분만의 생산성 팁이 있나요? 댓글로 공유해주세요! 👇\n\n원문: https://example.com/article\n\n또 다른 예시:\n**📢 커뮤니티 소식: 다가오는 기술 이벤트**\n\n안녕하세요 테크 커뮤니티 여러분!\n이번 달에 놓치면 안 될 주요 기술 이벤트를 안내해 드립니다:\n\n1. ***프론트엔드 개발자 밋업* (6월 15일)**\n   - 장소: 강남 코딩 라운지\n   - 시간: 저녁 7시 - 9시\n   - 주제: React 18의 새로운 기능들과 마이그레이션 전략\n   - 등록: [여기를 클릭하세요](https://example.com/register)\n\n2. ***클라우드 네이티브 워크숍* (6월 22일-23일)**\n   - 온라인 진행 (Zoom)\n   - 쿠버네티스와 서버리스 아키텍처 실습\n   - 초보자도 참여 가능한 핸즈온 세션\n\n3. ***해커톤: AI for Good* (6월 30일-7월 1일)**\n   - 48시간 동안 사회 문제 해결을 위한 AI 솔루션 개발\n   - 최대 4인 팀 구성, 원격 참여 가능\n   - 우승 팀에게 개발 지원금 1천만원 제공\n\n참가를 원하시면 각 이벤트 링크를 통해 등록해주세요. 궁금한 점은 언제든 채널에 질문 남겨주세요! 🙌',

	[Platform.NEWSLETTER]:
		'뉴스레터는 구독자들에게 정기적으로 전달되는 이메일 형식의 콘텐츠입니다. 인사말로 시작하고, 명확한 섹션 구분과 소제목을 활용해 스캔하기 쉽게 구성해주세요. 행동 유도(CTA)를 포함하고 개인적인 어조로 작성하세요. 원문 링크는 "원문 보기: [링크]" 형식으로 적절한 위치에 추가해주세요.\n\n예시:\n제목: 주간 개발자 인사이트: 효율적인 코드 작성의 비밀\n\n안녕하세요, [이름]님!\n\n이번 주 뉴스레터에서는 개발자 생산성과 코드 품질을 동시에 향상시키는 방법에 대해 알아보겠습니다.\n\n## 이번 주 하이라이트\n\n**클린 코드의 실제 적용 사례**\n로버트 마틴의 클린 코드 원칙을 실제 프로젝트에 적용했을 때 얻을 수 있는 이점과 팀의 협업 효율성이 어떻게 향상되는지 살펴봅니다.\n\n**개발자 번아웃 방지하기**\n지속 가능한 개발 습관과 정신 건강을 유지하는 방법에 대한 전문가의 조언을 소개합니다.\n\n## 이 주의 도구\n\n- **[GitHub Copilot](https://github.com/features/copilot)**: AI 코드 어시스턴트로 반복 작업 줄이기\n- **[Notion](https://notion.so)**: 개발 문서화와 지식 관리의 효율적인 방법\n\n## 다음 주 예고\n\n다음 주에는 마이크로서비스 아키텍처의 장단점과 실제 구현 사례를 다룰 예정입니다.\n\n질문이나 의견이 있으시면 이 이메일에 회신해 주세요. 항상 여러분의 피드백을 기다리고 있습니다!\n\n더 많은 개발 팁이 필요하시면 [블로그](https://example.com)를 방문해 보세요.\n\n감사합니다,\n[이름] 드림\n\n원문 보기: https://example.com/article\n\n또 다른 예시:\n제목: 테크 트렌드 리포트: 2023년 2분기 AI 기술 동향\n\n안녕하세요, [이름]님!\n\n2분기 기술 동향을 정리한 뉴스레터를 보내드립니다. 이번에는 AI 기술의 급속한 발전과 산업별 활용 사례에 중점을 두었습니다.\n\n## 주요 AI 트렌드\n\n**생성형 AI의 폭발적 성장**\nGPT-4, Claude, Midjourney의 등장으로 텍스트와 이미지 생성 기술이 크게 발전했습니다. 특히 최근에는 기업용 커스텀 AI 모델이 빠르게 증가하는 추세입니다.\n\n**AI 규제와 윤리적 논쟁**\nEU의 AI Act와 미국의 규제 프레임워크 논의가 활발히 진행중입니다. 프라이버시, 저작권, 일자리 대체 문제가 주요 쟁점으로 떠올랐습니다.\n\n**산업별 AI 활용 사례**\n- 의료: 희귀질환 진단 정확도 32% 향상\n- 금융: 이상거래 탐지 시스템으로 사기 시도 28% 감소\n- 제조: 예측 유지보수로 설비 다운타임 45% 절감\n\n## 추천 읽을거리\n\n1. [AI 발전의 현주소와 미래 전망](https://example.com/ai-future)\n2. [기업을 위한 AI 도입 가이드](https://example.com/ai-adoption)\n3. [AI 윤리와 규제: 균형점 찾기](https://example.com/ai-ethics)\n\n## AI 툴킷\n\n- **[Hugging Face](https://huggingface.co)**: 오픈소스 AI 모델 허브\n- **[LangChain](https://langchain.com)**: LLM 애플리케이션 개발 프레임워크\n- **[Pinecone](https://pinecone.io)**: 벡터 데이터베이스로 AI 검색 구현\n\n다음 뉴스레터에서는 엣지 컴퓨팅과 AI의 만남에 대해 다룰 예정입니다. 기대해 주세요!\n\n원문 보기: https://example.com/article',

	[Platform.BLOG]:
		'블로그는 심층적인 내용을 다루기 적합한 플랫폼입니다. SEO를 고려한 제목과 소제목을 사용하고, 충분한 설명과 예시, 참고 자료로 내용을 풍부하게 해주세요. 검색 엔진 최적화를 위해 키워드를 자연스럽게 포함시키고, 1,500-2,500자 정도의 길이가 적절합니다. 원문 출처는 포스트 마지막에 \'이 글은 [원문 링크]의 내용을 바탕으로 작성되었습니다.\' 형식으로 추가해주세요.\n\n예시:\n# 효과적인 문제 해결을 위한 개발자의 사고방식\n\n## 서론\n\n소프트웨어 개발에서 문제 해결 능력은 기술적 지식만큼이나 중요합니다. 복잡한 버그를 추적하거나 새로운 기능을 설계할 때, 체계적인 접근 방식은 효율성과 결과물의 품질을 크게 향상시킵니다.\n\n## 문제 해결의 핵심 원칙\n\n### 1. 명확한 문제 정의\n\n문제 해결의 첫 단계는 정확히 무엇이 문제인지 정의하는 것입니다. "로그인이 작동하지 않는다"와 같은 모호한 문제 정의 대신 "특정 브라우저에서 로그인 버튼 클릭 시 403 오류가 발생한다"와 같이 구체적으로 정의해야 합니다.\n\n### 2. 분할 정복 접근법\n\n큰 문제를 작은 단위로 나누어 하나씩 해결하는 방식입니다. 예를 들어, 전체 인증 시스템을 재설계하는 대신, 문제의 영역을 점진적으로 좁혀가며 핵심 원인을 찾아냅니다.\n\n### 3. 가설 설정과 검증\n\n과학적 방법론을 적용하여 문제의 원인에 대한 가설을 세우고, 이를 검증할 수 있는 테스트를 설계합니다. 이 과정을 통해 직관이 아닌 데이터에 기반한 의사결정이 가능해집니다.\n\n## 실전 사례 연구\n\n최근 프로젝트에서 API 응답 속도가 갑자기 느려지는 문제가 발생했습니다. 다음과 같은 체계적인 접근으로 문제를 해결했습니다:\n\n1. **문제 정의**: 특정 시간대에 API 응답 시간이 2초 이상으로 증가\n2. **데이터 수집**: 서버 로그, 데이터베이스 성능 메트릭, 네트워크 트래픽 분석\n3. **가설 설정**: 데이터베이스 인덱싱 문제로 인한 쿼리 성능 저하 의심\n4. **검증 및 해결**: 실행 계획 분석을 통해 인덱스 최적화 및 쿼리 개선\n\n이와 같은 접근 방식으로 API 응답 시간을 200ms 이하로 개선할 수 있었습니다.\n\n## 결론\n\n효과적인 문제 해결은 기술적 지식뿐만 아니라 체계적인 사고 방식에서 비롯됩니다. 명확한 문제 정의, 분할 정복 접근법, 그리고 가설 설정과 검증의 사이클을 통해 복잡한 개발 문제도 효율적으로 해결할 수 있습니다.\n\n다음 글에서는 팀 협업 상황에서의 문제 해결 방법론에 대해 더 자세히 다루겠습니다.\n\n이 글은 https://example.com/article의 내용을 바탕으로 작성되었습니다.',

	[Platform.DISCORD]:
		'Discord는 커뮤니티 기반 플랫폼으로, 친근하고 대화적인 스타일이 중요합니다. Markdown 서식을 지원하니 **볼드**, *이탤릭*, ~~취소선~~ 등을 활용하세요. 멘션이나 이모지를 적절히 사용하고, 명확한 문단 구분으로 가독성을 높이세요. 메시지는 짧고 간결하게 작성하는 것이 좋습니다. 원문 링크는 메시지 마지막에 포함해주세요.\n\n예시:\n@everyone\n\n**🔥 이번 주 개발 챌린지: 알고리즘 문제 풀기 🔥**\n\n안녕하세요 개발자 여러분! 이번 주 알고리즘 스터디를 시작합니다:\n\n**문제**: 주어진 배열에서 가장 긴 증가하는 부분 수열 찾기\n**난이도**: ⭐⭐☆☆☆ (중급)\n**마감**: 이번 주 금요일 오후 6시\n\n참여 방법:\n1. 작성한 코드를 `#algorithm-solutions` 채널에 공유하세요\n2. 다른 참가자들의 솔루션에 피드백을 남겨주세요\n3. 가장 효율적인 솔루션은 다음 주에 선정하여 발표할 예정입니다!\n\n질문이 있으시면 댓글로 남겨주세요! 👇\n함께 성장해봐요! 💪\n\n원문: https://example.com/article\n\n또 다른 예시:\n@here\n\n**:rocket: 신규 프로젝트 참여자 모집 공고 :rocket:**\n\n안녕하세요, 개발자 여러분!\n\n저희 커뮤니티에서 새로운 오픈소스 프로젝트를 시작하게 되었습니다. **"코드메이트"** - 개발자를 위한 AI 페어 프로그래밍 도구입니다!\n\n**:mag: 모집 분야:**\n• 프론트엔드 개발자 (React, TypeScript): 2명\n• 백엔드 개발자 (Node.js, Python): 2명\n• ML/AI 전문가 (PyTorch, Transformers): 1명\n• 디자이너 (UI/UX): 1명\n\n**:calendar: 일정:**\n• 지원 마감: 6월 20일\n• 킥오프 미팅: 6월 25일\n• 개발 기간: 3개월 (주 1회 온라인 미팅)\n\n**:gift: 참여 혜택:**\n• 실무 경험 및 포트폴리오 구축 기회\n• 활발한 오픈소스 커뮤니티 활동\n• 프로젝트 완료 시 기여자 인증서 발급\n• 최우수 기여자에게는 개발 장비 지원!\n\n관심 있으신 분들은 아래 구글 폼을 통해 지원해주세요:\n:link: https://forms.gle/exampleFormLink\n\n질문이 있으시면 `#project-questions` 채널이나 DM으로 문의 주세요! :speech_balloon:\n\n함께 멋진 프로젝트를 만들어 봐요! :raised_hands:',

	[Platform.TWITTER]:
		'Twitter(X)는 매우 간결한 메시지가 핵심입니다. 280자 제한이 있으므로, 핵심 메시지만을 담아 간결하게 작성해주세요. 해시태그를 1-2개 포함하고, 질문이나 대화를 유도하는 문구를 넣으면 효과적입니다. 언어는 직접적이고 영향력 있게 사용하세요. 가능하면 원문 링크를 포함해주세요.\n\n예시:\n매일 15분 코딩 문제를 푸는 습관이 6개월 만에 저의 알고리즘 실력을 완전히 바꿔놓았습니다. 작은 습관의 누적이 실력 향상의 비결입니다. 여러분은 어떤 개발 습관을 유지하고 계신가요? #개발자팁\nhttps://example.com/article\n\n또 다른 예시:\n지난 3개월간 Next.js 13 앱 라우터로 마이그레이션한 결과: 페이지 로드 속도 43% 향상, 번들 사이즈 28% 감소, SEO 점수 30점 상승. 서버 컴포넌트의 마법이란... 🚀 #NextJS #웹성능\nhttps://example.com/article\n\n또 다른 예시:\n"코드 작성보다 코드 읽기가 10배는 더 많은 시간을 차지한다" 이 사실을 깨닫고 주석 작성과 변수명에 훨씬 더 신경쓰기 시작했습니다. 개발 생산성이 눈에 띄게 향상됐어요. 여러분의 코드 가독성 향상 팁은? #클린코드',
};

// 각 플랫폼 기본 설정
export const DEFAULT_PLATFORMS: PlatformConfig[] = [
	{
		id: Platform.INSTAGRAM,
		name: '인스타그램',
		icon: 'instagram',
		envKey: 'INSTAGRAM_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.INSTAGRAM],
		requiresAuth: true,
		maxLength: 2200,
		supportedMediaTypes: ['image', 'video'],
	},
	{
		id: Platform.THREAD,
		name: '스레드',
		icon: 'thread',
		envKey: 'THREAD_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.THREAD],
		requiresAuth: true,
		maxLength: 500,
		supportedMediaTypes: ['image', 'video'],
	},
	{
		id: Platform.LINKEDIN,
		name: '링크드인',
		icon: 'linkedin',
		envKey: 'LINKEDIN_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.LINKEDIN],
		requiresAuth: true,
		maxLength: 3000,
		supportedMediaTypes: ['image', 'document'],
	},
	{
		id: Platform.TELEGRAM,
		name: '텔레그램',
		icon: 'telegram',
		envKey: 'TELEGRAM_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.TELEGRAM],
		requiresAuth: true,
		supportedMediaTypes: ['image', 'video', 'document', 'audio'],
	},
	{
		id: Platform.NEWSLETTER,
		name: '뉴스레터',
		icon: 'newsletter',
		envKey: 'NEWSLETTER_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.NEWSLETTER],
		requiresAuth: false,
		supportedMediaTypes: ['image'],
	},
	{
		id: Platform.BLOG,
		name: '블로그',
		icon: 'blog',
		envKey: 'BLOG_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.BLOG],
		requiresAuth: false,
		supportedMediaTypes: ['image', 'video', 'document'],
	},
	{
		id: Platform.DISCORD,
		name: '디스코드',
		icon: 'discord',
		envKey: 'DISCORD_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.DISCORD],
		requiresAuth: true,
		supportedMediaTypes: ['image', 'video', 'document'],
	},
	{
		id: Platform.TWITTER,
		name: '트위터(X)',
		icon: 'twitter',
		envKey: 'TWITTER_API_KEY',
		enabled: true,
		prompt: PLATFORM_PROMPTS[Platform.TWITTER],
		requiresAuth: true,
		maxLength: 280,
		supportedMediaTypes: ['image', 'video'],
	},
];

// 플랫폼 설정 저장 (localStorage 사용)
export function savePlatformSettings(platforms: PlatformConfig[]): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('platform-settings', JSON.stringify(platforms));
	}
}

// 플랫폼 설정 불러오기
export function loadPlatformSettings(): PlatformConfig[] {
	if (typeof window === 'undefined') {
		return DEFAULT_PLATFORMS;
	}

	const savedSettings = localStorage.getItem('platform-settings');
	if (!savedSettings) {
		return DEFAULT_PLATFORMS;
	}

	try {
		return JSON.parse(savedSettings) as PlatformConfig[];
	} catch (error) {
		console.error('플랫폼 설정 로드 오류:', error);
		return DEFAULT_PLATFORMS;
	}
}

// 특정 플랫폼 설정 업데이트
export function updatePlatformSetting(
	platformId: PlatformType,
	update: Partial<PlatformConfig>,
): PlatformConfig[] {
	const settings = loadPlatformSettings();
	const updatedSettings = settings.map(platform =>
		platform.id === platformId ? { ...platform, ...update } : platform,
	);
	savePlatformSettings(updatedSettings);
	return updatedSettings;
}

// localStorage를 초기화하고 기본 플랫폼 설정으로 재설정
export function resetPlatformSettings(): PlatformConfig[] {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('platform-settings');
	}
	return DEFAULT_PLATFORMS;
}

// 콘텐츠 길이 체크 및 경고
export function checkContentLength(
	content: string,
	platform: PlatformConfig,
): { valid: boolean; message?: string } {
	if (!platform.maxLength) {
		return { valid: true };
	}

	if (content.length > platform.maxLength) {
		return {
			valid: false,
			message: `${platform.name}의 최대 길이(${platform.maxLength}자)를 초과했습니다. 현재 ${content.length}자입니다.`,
		};
	}

	return { valid: true };
}
