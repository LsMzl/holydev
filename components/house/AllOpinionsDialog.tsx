"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

interface AllOpinionsDialog {
   allOpinions: {
      title: string;
      content: string;
      createdAt: Date;
      author: {
         lastName: string;
         firstName: string;
         pseudo: string;
         profilePicture: string;
      };
   }[];
}

const AllOpinionsDialog = ({ allOpinions }: AllOpinionsDialog) => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
               Voir tout
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Tout les avis</DialogTitle>
            </DialogHeader>
            <Separator className="my-2" />
            <div className="space-y-3">
               {allOpinions.map((opinion) => (
                  <div className="bg-card/50 rounded-lg flex items-center p-3  w-full">
                     <Link
                        href={`/user/${opinion.author.pseudo}`}
                        title={`Profil de ${opinion.author.firstName} ${opinion.author.lastName}`}
                        className="w-[15%]"
                     >
                        <Image
                           src={opinion.author.profilePicture}
                           alt={`Photo de ${opinion.author.firstName} ${opinion.author.lastName}`}
                           height={40}
                           width={40}
                        />
                     </Link>
                     <div className="w-[85%]">
                        <p className="font-semibold">{opinion.title}</p>
                        <p className="text-sm">{opinion.content}</p>
                        <p className="text-xs mt-2">
                           Publié le{" "}
                           {moment(opinion.createdAt).format("dd.MMMM.YYYY")}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default AllOpinionsDialog;
