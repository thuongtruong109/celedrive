"use client";

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/_components/ui/button';
import { useToast } from '@/lib/use-toast';

const API_URI = 'http://localhost:8000';

interface UploadResponse {
  path: string;
}

export const uploadFile = async (data: FormData) => {
  try {
    const response = await axios.post<UploadResponse>(`${API_URI}/upload`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log('Error while calling the API ', error.message);
    return null;
  }
}

const ShareExternalPage: React.FC = () => {
  const { toast } = useToast();
  
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        if (response) {
          setResult(response.path);
          toast({
            variant: "success",
            title: "File Uploaded",
            description: "Now everyone can view your file",
          });
        }
      }
    }
    getImage();
  }, [file])

  const test = () => {
    toast({
      variant: "success",
      title: "File Uploaded",
      description: "Now everyone can view your file",
    });
  }

  const onUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className='container'>
      <p onClick={test}>Upload and share the download link.</p>

      <Button onClick={onUploadClick}>Upload</Button>

      <input type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      {/* <a href={result} target="_blank" rel="noreferrer">{result}</a> */}

      <a href={result} target="_blank" rel="noreferrer">http://localhost:8000/file/665567fbd5c5f4b72bd65cdf</a>
    </div>
  );
}

export default ShareExternalPage;
