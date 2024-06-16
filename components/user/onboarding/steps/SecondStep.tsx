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
import axios from "axios";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

const formSchema = z.object({
   profilePicture: z.string().url().nonempty(),
   biography: z.string().optional(),
   interests: z.string().optional(),
   languages: z.string().optional(),
});

const SecondStep = ({
   user,
   dbUser,
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
         profilePicture: user?.image
            ? user?.image
            : dbUser?.profilePicture || "",
         biography: dbUser?.biography || "",
         interests: dbUser?.interests || "",
         languages: dbUser?.languages || "",
      },
   });

   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);

   /** Progression du téléchargement */
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   /**- Etat de sélection de l'image, null par défaut */
   const [selectedImage, setSelectedImage] = useState<File | null>(null);

   const [files, setFiles] = useState<File[]>([]);

   /**- Stockage de l'image, null par défaut */
   const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
   >(null);

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault();
      // const file = e.target.files?.[0];
      // const fileTypes = ["jpg", "jpeg", "gif", "webp", "png", "svg"];

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files?.[0];
         setFiles(Array.from(e.target.files));

         if (!file.type.includes("image")) return;

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
         };

         fileReader.readAsDataURL(file);
      }
   };

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Récupération de l'image uploadée
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
                        <FormItem className="flex items-center justify-center md:justify-start gap-5">
                           <FormLabel>
                              {field.value ? (
                                 <Image
                                    src={field.value}
                                    alt="profile_icon"
                                    width={96}
                                    height={96}
                                    priority
                                    className="rounded-full object-cover h-32 w-32"
                                 />
                              ) : (
                                 <Image
                                    src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.email}`}
                                    alt="profile_icon"
                                    width={24}
                                    height={24}
                                    className="rounded-full object-cover"
                                 />
                              )}
                           </FormLabel>
                           <FormControl>
                              <label
                                 className={cn(
                                    isLoading
                                       ? "cursor-not-allowed"
                                       : "cursor-pointer",
                                    "bg-secondary hover:bg-primary rounded px-2 py-2 font-medium animate shadow"
                                 )}
                              >
                                 <div className="flex items-center gap-2 text-sm">
                                    <Camera />
                                    <span>Sélectionner une photo</span>
                                 </div>
                                 <Input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                       handleImageSelect(e, field.onChange)
                                    }
                                 />
                              </label>
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
