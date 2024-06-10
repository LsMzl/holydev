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

const formSchema = z.object({
   profilePicture: z.string().optional(),
   biography: z.string().optional(),
   interests: z.array(z.string()).optional(),
   languages: z.array(z.string()).optional(),
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
         interests: [],
         languages: [],
      },
   });
   /** Progression du téléchargement */
   const [uploadProgress, setUploadProgress] = useState<number>(0);

   /**- Stockage de l'image, null par défaut */
   const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
   >(null);

   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {};

   return (
      <section>
         <div className="flex gap-5">
            {/* Left section */}
            <div className="">
               <div className="w-[440px] m-auto ">
                  <h1 className="text-4xl font-medium mb-3">
                     Faisons un peu plus connaissance
                  </h1>
                  <p className="text-sm">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Rem consequatur impedit adipisci ab, cupiditate maiores.
                  </p>
               </div>

               <OnboardingNav />
            </div>
            {/* Right section */}
            <div className="">
               <Form {...form}>
                  <form className="space-y-5 mb-10">
                     {/* Avatar */}
                     <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 Photo de profil{" "}
                                 <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <ImageInput
                                    {...field}
                                    handleImageSelect={handleImageSelect}
                                    imagePreview={imagePreview}
                                    uploadProgress={uploadProgress}
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
                                 Biographie{" "}
                                 <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormDescription>
                                 Dîtes aux autres utilisateurs qui vous-êtes
                              </FormDescription>
                              <FormControl>
                                 <Textarea></Textarea>
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
                  </form>
                  <OnboardingNav
                     next={next}
                     previous={previous}
                     isFirstStep={isFirstStep}
                     isFinalStep={isFinalStep}
                  />
               </Form>
            </div>
         </div>
      </section>
   );
};

export default SecondStep;
