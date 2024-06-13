import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Camera, Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";

export interface AvatarInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   handleAvatarSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
   imagePreview: string | ArrayBuffer | null;
   uploadProgress: number;
   userMail?: string;
   avatar: string;
}

const AvatarInput = React.forwardRef<HTMLInputElement, AvatarInputProps>(
   (
      {
         className,
         type,
         imagePreview,
         handleAvatarSelect,
         uploadProgress,
         avatar,
         userMail,
         ...props
      },
      ref
   ) => {
      const [isLoading, setIsLoading] = React.useState(false);
      return (
         <div className="flex items-center gap-3 relative">
            {/* Barre de progression */}
            {/* <div
               className={uploadProgressBarStyle}
               style={{ width: `${uploadProgress}%` }}
            /> */}

            {/* Remplacement de l'input file par un bouton personnalisé */}
            <Avatar className="bg-background h-32 w-32 drop-shadow">
               <AvatarImage
                  className="object-cover"
                  src={
                     imagePreview
                        ? typeof imagePreview === "string"
                           ? imagePreview
                           : String(imagePreview)
                        : avatar ||
                          `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userMail}`
                  }
               />
            </Avatar>
            <label
               className={cn(
                  isLoading ? "cursor-not-allowed" : "cursor-pointer",
                  "inline-block bg-secondary/80 hover:animate-ping px-2 py-2 font-medium animate shadow-lg rounded-full absolute bottom-1 -right-2"
               )}
               title="Changer de photo de profil"
            >
               <Camera />
               <Input
                  className={cn(className, "hidden")}
                  {...props}
                  ref={ref}
                  type="file"
                  disabled={isLoading}
                  onChange={handleAvatarSelect}
               />
            </label>
         </div>
      );
   }
);
AvatarInput.displayName = "AvatarInput";

export { AvatarInput };
