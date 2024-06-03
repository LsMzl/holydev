/** Génération d'un avatar aléatoire et unique en fonction de l'email utilisateur.
 * @documentation https://www.dicebear.com/
 * @date Créé le 31.05.24
 * @creator Louis Mazzella
 */

import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";


export const UserAvatar = ({
   email,
   image,
}: {
   email: any;
   image?: any;
}) => {
   const placeholderImage = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${email}`;

   const finalImage = image ?? placeholderImage;
   return (
      <Avatar className="hidden sm:block ml-1">
         {/* <AvatarFallback>{email[0].toUpperCase()}</AvatarFallback> */}
         <AvatarImage src={finalImage} />
      </Avatar>
   );
};