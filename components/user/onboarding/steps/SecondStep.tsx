"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Libraries
import * as z from "zod";
import OnboardingNav from "../navigation/OnboardingNav";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageInput } from "@/components/ui/imageInput";
import { ComponentsProps } from "@/types/onboardingTypes";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const formSchema = z.object({
   profilePicture: z.string().optional(),
   biography: z.string().optional(),
   interests: z.string().optional(),
   languages: z.string().optional(),
});

const SecondStep = ({
   next,
   previous,
   isFirstStep,
   isFinalStep,
   stepsList,
   getCurrentStep,
}: ComponentsProps) => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         profilePicture: "",
         biography: "",
         interests: "",
         languages: "",
      },
   });

   const { user } = useUser();
   const userEmail = user?.emailAddresses[0].emailAddress;

   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);

   /** Progression du téléchargement */
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   /**- Etat de sélection de l'image, null par défaut */
   const [selectedImage, setSelectedImage] = useState<File | null>(null);

   /**- Stockage de l'image, null par défaut */
   const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
   >(null);

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      values.profilePicture = imagePreview?.toString();
      setIsLoading(true);
      axios
         .patch(`api/user/onboarding`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Yeah, vos informations ont bien été enregistrées!",
            });
            setIsLoading(false);
            next();
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
      <section className="flex flex-col md:flex-row md:mx-10 md:gap-5 mx-4">
         {/* Left section */}
         <div className="mb-3 md:mb-0">
            <div className="md:w-[360px] m-auto ">
               <h1 className=" text-center md:text-start text-3xl md:text-4xl font-medium mb-3">
                  Faisons un peu plus connaissance
               </h1>
               <p className="text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consequatur impedit adipisci ab, cupidite.
               </p>
            </div>
         </div>
         {/* Right section */}
         <div className="md:w-[400px]">
            <Form {...form}>
               <form className="space-y-3 md:space-y-5 mb-5 md:mb-10">
                  {/* Avatar */}
                  <FormField
                     control={form.control}
                     name="profilePicture"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Photo de profil </FormLabel>
                           <FormDescription>
                              Formats acceptés: jpg, jpeg, gif, webp, png, svg
                           </FormDescription>
                           <FormControl>
                              <ImageInput
                                 {...field}
                                 handleImageSelect={handleImageSelect}
                                 imagePreview={imagePreview}
                                 uploadProgress={uploadProgress}
                                 disabled={isLoading}
                                 userMail={userEmail}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Biography */}
                  <FormField
                     control={form.control}
                     name="biography"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Biographie <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormDescription>
                              Dîtes aux autres utilisateurs qui vous-êtes
                           </FormDescription>
                           <FormControl>
                              <Textarea
                                 placeholder="Donnez envie aux membres d'entrer en contact avec vous"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/* Interests */}
                  <FormField
                     control={form.control}
                     name="interests"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Centres d'interêts{" "}
                              <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Voyages, lectures..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/* Languages */}
                  <FormField
                     control={form.control}
                     name="languages"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Langues parlées{" "}
                              <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Français, Anglais..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <OnboardingNav
                     next={form.handleSubmit(onSubmit)}
                     previous={previous}
                     isFirstStep={isFirstStep}
                     isFinalStep={isFinalStep}
                  />
               </form>
            </Form>
         </div>
      </section>
   );
};

export default SecondStep;
