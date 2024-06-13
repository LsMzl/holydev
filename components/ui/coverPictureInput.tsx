import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { ImageUp } from "lucide-react";

import Image from "next/image";
import { buttonVariants } from "./button";
import Banner from "@/public/img/banniere.jpg";

export interface ImageInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   handleCoverPictureSelect: (
      event: React.ChangeEvent<HTMLInputElement>
   ) => void;
   imagePreview: string | ArrayBuffer | null;
   uploadProgress: number;
   coverPicture: string;
}

const CoverPictureInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
   (
      {
         className,
         type,
         imagePreview,
         handleCoverPictureSelect,
         uploadProgress,
         coverPicture,
         ...props
      },
      ref
   ) => {
      const [isLoading, setIsLoading] = React.useState(false);
      return (
         <div className="relative">
            {/* Barre de progression */}
            {/* <div
               className={uploadProgressBarStyle}
               style={{ width: `${uploadProgress}%` }}
            /> */}

            {/* Remplacement de l'input file par un bouton personnalisé */}

            <div className="h-[200px] relative bg-background w-[460px] rounded">
               <Image
                  src={
                     imagePreview
                        ? typeof imagePreview === "string"
                           ? imagePreview
                           : String(imagePreview)
                        : coverPicture || Banner

                  }
                  fill
                  className="object-cover rounded"
                  alt=""
               />
            </div>
            <label
               className={cn(
                  isLoading ? "cursor-not-allowed" : "cursor-pointer",
                  "absolute bottom-1 right-1"
               )}
               title="Changer de photo de couverture"
            >
               <div className={cn(buttonVariants())}>
                  <ImageUp className="mr-2 h-4 w-4" />
                  Choisir
               </div>
               <Input
                  className={cn(className, "hidden")}
                  {...props}
                  ref={ref}
                  type="file"
                  disabled={isLoading}
                  onChange={handleCoverPictureSelect}
               />
            </label>
         </div>
      );
   }
);
Input.displayName = "CoverPictureInput";

export { CoverPictureInput };
