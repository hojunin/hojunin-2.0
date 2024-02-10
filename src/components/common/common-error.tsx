import { BanIcon } from 'lucide-react'

const CommonError = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-48">
      <BanIcon color="#ef3333" size={50} />
      <h2 className="scroll-m-20 mt-8 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        에러가 발생했어요
      </h2>
    </div>
  )
}

export default CommonError
