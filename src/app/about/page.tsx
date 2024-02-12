import { Badge } from '@/components/ui/badge';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="mt-20 flex flex-col gap-y-5">
      <section>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          사람 인호준을 소개해요
        </h2>
        지금은 코드로 눈에 보이는 작품들을 만들어내는 일에 열정을 쏟고 있습니다.
        <Badge className="bg-[#61dbfb] hover:opacity-75">React</Badge>,{' '}
        <Badge>React Native</Badge>, JavaScript, TypeScript, Next.js 등을 다루며
        현업에서 경험을 쌓아왔습니다. 마치 브러시로 색을 칠하는 화가처럼, 코드로
        새로운 세계를 창조하는 기쁨에 빠져 있습니다.
      </section>
      <section>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          개발자 인호준을 소개해요
        </h2>
        또한, 나만의 세계를 찾는 데에 관심이 많습니다. 조용한 카페의 코너에 혼자
        앉아, 코드와 글쓰기를 통해 새로운 아이디어를 탐험하는 것은 마치 고요한
        숲에서 속삭임을 듣는 듯한 느낌입니다. 사람들과 어울리는 것을 즐기며,
        독서모임이나 운동 모임에 자주 참여하여 새로운 시각과 경험을 얻고
        있습니다. 이렇게 다양한 인연과의 만남은 마치 각기 다른 색으로 물들인
        팔레트처럼, 나의 삶에 풍요로움을 더해주고 있습니다.
      </section>
      <section>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          000 인호준을 소개해요
        </h2>
        마지막으로, 끊임없이 학습하고 성장하는 것에 대한 열망을 가지고 있습니다.
        코드의 세계에서 새로운 도전을 꺼내어 함께 성장하는 모습은 마치 끊임없이
        펼쳐지는 책 속의 모험과도 같습니다. 이런 마음가짐으로, 앞으로도 새로운
        기술과 아이디어를 탐험하며 더 나은 개발자로 성장하고자 합니다. 함께
        여행하는 동료들과 함께, 코드의 세계에서 더 큰 임팩트를 남기는 것이
        목표입니다.
      </section>
    </div>
  );
};

export default AboutPage;
