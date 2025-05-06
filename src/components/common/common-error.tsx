import { BanIcon } from 'lucide-react';

interface Props {
	message?: string;
}

const CommonError = ({ message }: Props) => {
	return (
		<div className="flex h-48 w-full flex-col items-center justify-center">
			<BanIcon color="#ef3333" size={50} />
			<h2 className="mt-8 scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
				에러가 발생했어요
			</h2>

			{message && <p>{message}</p>}
		</div>
	);
};

export default CommonError;
