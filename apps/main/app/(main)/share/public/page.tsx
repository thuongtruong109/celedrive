"use client";

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/_components/ui/button';
import { useToast } from '@/lib/use-toast';
import { PiCopySimpleThin } from "react-icons/pi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface UploadResponse {
  id: string;
}

const uploadFile = async (data: FormData) => {
  try {
    const response = await axios.post<UploadResponse>(`${process.env.NEXT_PUBLIC_SHARE_PUBLIC_API_URI}/upload`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log('Error while calling the API ', error.message);
    return null;
  }
}

const SharePublicPage: React.FC = () => {
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
          setResult(`${process.env.NEXT_PUBLIC_SHARE_PUBLIC_API_URI}/file/${response.id}`);
          toast({
            variant: "success",
            title: "File Uploaded",
            description: "The link is ready to be shared",
          });
        }
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(function() {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  return (
    <div className='flex flex-col items-center space-y-8'>
      <h2 className="text-xl font-semibold">Upload and share the download link.</h2>

      <Button onClick={onUploadClick}>
        <AiOutlineCloudUpload />
        <span>Upload</span>
      </Button>

      <input type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />

      {
        result && <div className="flex flex-col items-center space-y-2 mt-10 border border-dotted border-blue-300 p-4 rounded-lg">
          <a href={result} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{result}</a>
          { result != '' && <Button variant="outline" onClick={() => copyLink(result)}>
            { isCopied ? <MdDone /> : <PiCopySimpleThin /> }
              <span>Copy</span>
            </Button>
          }
        </div>
      }
    </div>
  );
}

export default SharePublicPage;
