"use client";
import React from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cake, Pen } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

import Image from "next/image";
import Banner from "@/public/img/banniere.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UpdateAvatar from "./UpdateAvatar";
import UpdateCoverPicture from "./UpdateCoverPicture";
import UpdateBiography from "./UpdateBiography";

interface UpdateProfileProps {
   biography: string;
   avatar: string;
   email: string;
   coverPicture: string;
   inscriptionDate: Date | undefined;
}

const UpdateProfileForm = ({
   biography,
   avatar,
   email,
   coverPicture,
   inscriptionDate,
}: UpdateProfileProps) => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               className="font-semibold text-foreground flex gap-1"
               title="Modification du profil utilisateur"
            >
               <Pen size={15} />
               Modifier le profil
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Modifier le profil</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="space-y-5">
               {/* Photo de profil */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Photo de profil</p>
                     {/* Form */}
                     <UpdateAvatar avatar={avatar} />
                  </div>
                  <Avatar className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 drop-shadow-lg m-auto">
                     <AvatarImage
                        className="object-cover"
                        src={
                           avatar
                              ? avatar
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?${email}`
                        }
                     />
                  </Avatar>
               </div>
               {/* Photo de couverture */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">
                        Photo de couverture
                     </p>
                     <UpdateCoverPicture coverPicture={coverPicture} />
                  </div>
                  <div className="h-[150px] relative">
                     {/* //TODO Image par défaut si non renseignée */}
                     <Image
                        src={coverPicture ? coverPicture : Banner}
                        fill
                        className="object-cover"
                        alt=""
                     />
                  </div>
               </div>
               {/* Biography */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Biographie</p>
                     {/* Condition Editer si existante, Ajouter si non existante */}
                     <UpdateBiography biography={biography}/>
                  </div>
                  <p className="text-sm">
                     {biography
                        ? biography
                        : "Vous n'avez pas encore ajouté de biographie."}
                  </p>
               </div>
               {/* Membre depuis le */}
               <div className="flex items-end gap-2 text-sm">
                  <Cake size={20} />
                  <p>Membre depuis le 06 juin 2024</p>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateProfileForm;
