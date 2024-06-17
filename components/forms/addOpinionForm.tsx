"use client";
import React, { useState } from "react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { dataTypes } from "@/types/dataTypes";
import { toast } from "../ui/use-toast";
import { House } from "@prisma/client";

const formSchema = z.object({
   title: z
      .string()
      .min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
   content: z.string().min(5, {
      message: "Votre avis doit contenir au moins 5 caractères",
   }),
});

const AddOpinionForm = ({ house }: dataTypes) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         content: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      axios
         .post(`../api/opinion/${house?.id}`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Informations modifiées avec succès !",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez réessayer plus tard",
            });
            setIsLoading(false);
         });
   }
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button>Mettre un avis</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Mettre un avis</DialogTitle>
               <DialogDescription>
                  Partagez avec les autres utilisateur votre avis sur cette
                  annonce
               </DialogDescription>
            </DialogHeader>
            <Separator className="my-3" />
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Titre</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Donnez envie aux membres d'entrer en contact avec vous"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Contenu</FormLabel>
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
                  </div>
                  <DialogFooter className="mt-3">
                     <DialogClose className="space-x-2">
                        <Button
                           disabled={isLoading}
                           className="max-w-[150px] self-end"
                           type="submit"
                        >
                           {isLoading ? (
                              // Pendant le chargement
                              <>
                                 <Loader2 className="mr-2 h-4 w-4" /> En cours
                              </>
                           ) : (
                              // Sans chargement
                              <>Publier</>
                           )}
                        </Button>
                        <Button variant="secondary" type="button">
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

export default AddOpinionForm;
