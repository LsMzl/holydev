"use client";
import Image from "next/image";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Check, Loader2 } from "lucide-react";

interface AddPostProps {
   connectedUser: {
      id: string;
      firstName: string;
      profilePicture: string;
   };
}

const formSchema = z.object({
   // Identité
   content: z.string().min(5, {
      message: "Votre post doit contenir au moins 5 caractères",
   }),
   image: z.string().optional(),
});

const AddPostForm = ({ connectedUser }: AddPostProps) => {
   const [isLoading, setIsLoading] = useState(false);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         content: "",
         image: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {}
   return (
      <div className="flex w-full flex-col rounded-lg bg-card p-5 border">
         <div className="flex items-center gap-5">
            <div className="relative h-10 w-10">
               <Image
                  src={connectedUser.profilePicture}
                  fill
                  sizes="100%"
                  alt={`Photo de ${connectedUser.firstName}`}
                  className="ronded-full object-cover"
               />
            </div>
            <p className="font-medium capitalize">
               Bonjour {connectedUser.firstName}
            </p>
         </div>
         {/* Form */}
         <div className="mt-2">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="hidden" htmlFor="content">
                              Contenu
                           </FormLabel>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 rows={3}
                                 id="content"
                                 name="content"
                                 placeholder="Que voulez-vous partager avec vos amis ?"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="mt-2">
                     <Button
                        disabled={isLoading}
                        className="w-[100px]"
                        size="sm"
                     >
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <Loader2 className="h-4 w-4" />
                           </>
                        ) : (
                           // Sans chargement
                           <>
                              <Check className="mr-2 h-4 w-4" />
                              Poster
                           </>
                        )}
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default AddPostForm;
