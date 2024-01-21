import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.onerror = () => {
        setError('Error occurred while reading the file.');
        reader.abort();
      };

      reader.readAsDataURL(file);
    } else {
      setError('Please select an image file.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
              {selectedImage && 
        <Avatar className="h-40 w-40 mb-5">
            <AvatarImage alt="@shadcn" src={selectedImage} />
            <AvatarFallback>JP</AvatarFallback>
        </Avatar>}
      <input className="text-sm text-gray-100 mb-5
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "type="file" accept="image/*" onChange={handleImageChange} />
      {error && <p>Error: {error}</p>}
      {/* {selectedImage && 
        <Avatar className="h-24 w-24">
            <AvatarImage alt="@shadcn" src={selectedImage} />
            <AvatarFallback>JP</AvatarFallback>
        </Avatar>} */}
    </div>
  );
};

export default ImageUpload;
