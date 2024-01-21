import React, { useState, useContext} from 'react';
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import {UserContext} from "../context/userContext";

const ImageUpload: React.FC = () => {
   const [base64, setBase64] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
      const userContext = useContext(UserContext);
    const { user } = userContext; // Access 'user' from the context

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result as string;
        setBase64(result);
        setImageSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
              {imageSrc && 
        <Avatar className="h-40 w-40 mb-5">
            <AvatarImage alt="@shadcn" src={imageSrc} />
            <AvatarFallback>JP</AvatarFallback>
        </Avatar>}
      <input className="text-sm text-gray-100 mb-5
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
