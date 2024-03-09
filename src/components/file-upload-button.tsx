'use client';
import React, { ChangeEvent } from 'react';
import { Button } from './ui/button';
import { uploadFile } from '@/api/file-upload';

const FileUploadButton = () => {
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const uploadedUrl = await uploadFile(file);
  };
  return (
    <Button>
      <input type="file" onChange={handleFile} accept="image/*" />
    </Button>
  );
};

export default FileUploadButton;
