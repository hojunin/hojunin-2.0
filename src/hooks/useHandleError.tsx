import { useToast } from '@/components/ui/use-toast';

interface Options {
  toastTitle: string;
}

/**
 * 에러 객체를 처리하는 훅
 * 자동 센트리 전송, 토스트 메시지 등 에러 처리
 */
const useHandleError = () => {
  const { toast } = useToast();

  const handleError = (error: unknown, option?: Options) => {
    if (option) {
      const { toastTitle } = option;
      if (toastTitle) {
        toast({
          title: toastTitle,
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  return handleError;
};

export default useHandleError;
