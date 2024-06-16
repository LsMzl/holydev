import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Camera, Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";

export interface ImageInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
   imagePreview: string | ArrayBuffer | null;
   uploadProgress: number;
   userMail?: string | null | undefined;
}

const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
   (
      {
         className,
         type,
         imagePreview,
         handleImageSelect,
         uploadProgress,
         userMail,
         ...props
      },
      ref
   ) => {
      const [isLoading, setIsLoading] = React.useState(false);
      return (
         <div className="flex items-center gap-3">
            {/* Barre de progression */}
            {/* <div
               className={uploadProgressBarStyle}
               style={{ width: `${uploadProgress}%` }}
            /> */}

            {/* Remplacement de l'input file par un bouton personnalisé */}
            <Avatar className="bg-gray-200 h-32 w-32 border-2 border-gray-400 drop-shadow">
               <AvatarImage
                  className="object-cover"
                  src={
                     imagePreview
                        ? typeof imagePreview === "string"
                           ? imagePreview
                           : String(imagePreview)
                        : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userMail}`
                  }
               />
            </Avatar>
            <label
               className={cn(
                  isLoading ? "cursor-not-allowed" : "cursor-pointer",
                  "inline-block bg-secondary hover:bg-primary rounded px-2 py-2 font-medium animate shadow"
               )}
            >
               <div className="flex items-center gap-2 text-sm">
                  <Camera />
                  <span>Sélectionner une photo</span>
               </div>
               <Input
                  className={cn(className, "hidden")}
                  {...props}
                  ref={ref}
                  type="file"
                  disabled={isLoading}
                  onChange={handleImageSelect}
               />
            </label>
         </div>
      );
   }
);
ImageInput.displayName = "ImageInput";

export { ImageInput };
