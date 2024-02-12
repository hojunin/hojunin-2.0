import { BanIcon } from 'lucide-react';

interface Props {
  message?: string;
}

const CommonError = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-48">
      <BanIcon color="#ef3333" size={50} />
      <h2 className="scroll-m-20 mt-8 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        에러가 발생했어요
      </h2>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CommonError;
