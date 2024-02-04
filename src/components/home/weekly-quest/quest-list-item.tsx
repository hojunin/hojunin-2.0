import { CheckCircle2 } from 'lucide-react';
import React from 'react';

interface Props {
  checked: boolean;
  label: string;
}

const QuestListItem = ({ checked, label }: Props) => {
  return (
    <li className="flex items-center gap-x-2 cursor-pointer hover:opacity-80">
      <CheckCircle2 size={20} color={checked ? '#32cd32' : 'grey'} />
      <p>{label}</p>
    </li>
  );
};

export default QuestListItem;
