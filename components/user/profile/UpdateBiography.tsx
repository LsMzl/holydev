"use client";
import React, { useState } from "react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Loader2, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UpdateBiographyProps {
   biography: string;
}

const formSchema = z.object({
   biography: z.string().optional(),
});

const UpdateBiography = ({ biography }: UpdateBiographyProps) => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         biography: biography || "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);

      if (values.biography !== biography) {
         axios
            .patch(`../api/user/update`, values)
            .then((res) => {
               toast({
                  variant: "success",
                  description: "Biographie mise à jour avec succès",
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
      } else {
         toast({
            variant: "info",
            description: "Vous devez modifier votre biographie pour la mettre à jour.",
         });
         setIsLoading(false);
         return;
      }
   }

   return (
      <Dialog>
         <DialogTrigger className="text-sm hover:font-semibold">
            {biography ? "Modifier" : "Ajouter"}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Editez votre biographie</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  className="flex flex-col items-center gap-5"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <div className="w-full">
                     <FormField
                        control={form.control}
                        name="biography"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="hidden">
                                 Biographie
                              </FormLabel>
                              <FormControl>
                                 <Textarea
                                    {...field}
                                    rows={8}
                                    placeholder="Décrivez-vous brièvement"
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

export default UpdateBiography;
