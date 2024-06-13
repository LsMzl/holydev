"use client";
import React, { useState } from "react";

// Components
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// Libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Check, Loader2, X } from "lucide-react";
import { CoverPictureInput } from "@/components/ui/coverPictureInput";

interface UpdateCoverPictureProps {
   coverPicture: string;
}

const formSchema = z.object({
   coverPicture: z.string().optional(),
});

const UpdateCoverPicture = ({ coverPicture }: UpdateCoverPictureProps) => {
   const router = useRouter();

   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);
   /**- Etat de sélection de l'image, null par défaut */
   const [selectedImage, setSelectedImage] = useState<File | null>(null);
   const [uploadProgress, setUploadProgress] = useState<number>(0);

   /**- Stockage de l'image, null par défaut */
   const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
   >(null);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         coverPicture: "",
      },
   });

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleCoverPictureSelect = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const file = event.target.files?.[0];
      const fileTypes = ["jpg", "jpeg", "gif", "webp", "png", "svg"];

      //? Fichier existant
      if (file) {
         setSelectedImage(file);
         // Vérification de l'extension du fichier
         let fileExtension = file?.name.split(".").pop()?.toLocaleLowerCase();
         const isSuccess = fileTypes.indexOf(fileExtension || "") > -1;

         //! Extension non valide
         if (!isSuccess) {
            toast({
               variant: "destructive",
               title: "Extension de fichier non valide",
               description: "Veuillez sélectionner un fichier valide",
            });
            return null;
         }

         //* Extension valide
         // Lecture du fichier
         const reader = new FileReader();
         reader.onload = (event) => {
            let imageDataUrl: string | ArrayBuffer | null = null;
            //? Fichier existant
            if (event.target) {
               imageDataUrl = event.target.result;
            }
            setImagePreview(imageDataUrl);
         };
         reader.readAsDataURL(file);
      }
   };

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Récupération de l'image uploadée
      values.coverPicture = imagePreview?.toString();
      setIsLoading(true);

      axios
         .patch(`../api/user/update`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Image de couverture mise à jour avec succès",
            });
            router.refresh();
            setIsLoading(false);
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description: "Oups, une erreur est survenue...",
            });
            setIsLoading(false);
         });
   }

   return (
      <Dialog>
         <DialogTrigger className="text-sm hover:font-semibold">
            Modifier
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Sélectionnez une image de couverture</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  className="flex flex-col items-center gap-5 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <div className="">
                     <FormField
                        control={form.control}
                        name="coverPicture"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="hidden">
                                 Photo de profil{" "}
                              </FormLabel>
                              <FormControl>
                                 <CoverPictureInput
                                    {...field}
                                    handleCoverPictureSelect={
                                       handleCoverPictureSelect
                                    }
                                    imagePreview={imagePreview}
                                    uploadProgress={uploadProgress}
                                    disabled={isLoading}
                                    coverPicture={coverPicture}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DialogFooter>
                     <Button disabled={isLoading} className="w-full">
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <Loader2 className="mr-2 h-4 w-4" /> En cours
                           </>
                        ) : (
                           // Sans chargement
                           <>
                              <Check className="mr-2 h-4 w-4" />
                              Valider
                           </>
                        )}
                     </Button>
                     <DialogClose asChild>
                        <Button
                           type="button"
                           variant="secondary"
                           className="group"
                        >
                           <X className="mr-2 h-4 w-4 group-hover:animate-spin-fast" />
                           Annuler
                        </Button>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateCoverPicture;
