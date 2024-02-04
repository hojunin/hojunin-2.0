import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import QuestListItem from './quest-list-item';

const dummy = [
  { value: '잘 자기', checked: false },
  { value: '영양제 먹기', checked: false },
  { value: '멘토링 하기', checked: true },
  { value: '운동하기', checked: false },
  { value: '독서록 제출하기', checked: true },
  { value: '코딩하기', checked: false },
  { value: '영어공부하기', checked: false },
  { value: '책 읽기', checked: false },
  { value: '프로젝트 진행하기', checked: false },
];

const WeeklyQuest = () => {
  const onClickTodo = () => {};

  return (
    <div className="sm:w-2/5 w-full">
      <Card>
        <CardHeader>
          <CardTitle>주간 퀘스트</CardTitle>
          <CardDescription>주단위로 삶을 계획합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-y-2">
            {dummy.map((quest, index) => (
              <QuestListItem
                key={quest.value}
                label={quest.value}
                checked={quest.checked}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyQuest;
