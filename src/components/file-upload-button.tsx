'use client';
import React, { ChangeEvent } from 'react';
import { Button } from './ui/button';
import { uploadFile } from '@/api/file-upload';
import { useToast } from './ui/use-toast';

const FileUploadButton = () => {
  const { toast } = useToast();
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
      toast({
        title: '문제가 발생했어요',
        description: error?.message,
        variant: 'destructive',
      });
    }
  };
  return (
    <Button>
      <input type="file" onChange={handleFile} accept="image/*" />
    </Button>
  );
};

export default FileUploadButton;
