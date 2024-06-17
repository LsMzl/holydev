"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pen } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
   biography: z.string().min(1, {
      message: "Vous ne pouvez pas ajouter une biographie vide",
   }),
});

const BiographyPopUpForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         biography: "",
      },
   });

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button size="sm">Ajouter biographie</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Editer ma biographie</DialogTitle>
            </DialogHeader>
            <DialogDescription>
               Expliquez en quelques lignes ce que vous êtes et ce que vous
               faites.
            </DialogDescription>

            <Form {...form}>
               <form className="flex flex-col gap-3">
                  <FormField
                     control={form.control}
                     name="biography"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="hidden">Biographie</FormLabel>
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
                  <Button
                     disabled={isLoading}
                     className="max-w-[150px] self-end"
                  >
                     {isLoading ? (
                        // Pendant le chargement
                        <>
                           <Loader2 className="mr-2 h-4 w-4" /> En cours
                        </>
                     ) : (
                        // Sans chargement
                        <>
                           <Pen className="mr-2 h-4 w-4" />
                           Valider
                        </>
                     )}
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default BiographyPopUpForm;
