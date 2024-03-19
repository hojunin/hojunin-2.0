'use client';
import React, { ChangeEvent } from 'react';
import { Button } from './ui/button';
import { uploadFile } from '@/api/file-upload';
import { useToast } from './ui/use-toast';
import useHandleError from '@/hooks/useHandleError';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FileUploadButton = () => {
  const { toast } = useToast();
  const handleError = useHandleError();
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    try {
      const uploadedUrl = await uploadFile(file);
      toast({
        title: '업로드 성공',
        description: `${file.name} 업로드 성공`,
        action: (
          <Button onClick={() => navigator.clipboard.writeText(uploadedUrl)}>
            주소 복사
          </Button>
        ),
      });
    } catch (error) {
      handleError(error, { toastTitle: '문제가 발생했어요' });
    }
  };
  return (
    <section className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        className="cursor-pointer"
        onChange={handleFile}
        accept="image/*"
      />
    </section>
  );
};

export default FileUploadButton;
