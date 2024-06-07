"use client";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getAllCategories } from "@/queries/getAllCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Loader2, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddEquipmentProps {
   category: Category | null;
}

/** Schéma du formulaire. */
const formSchema = z.object({
   name: z.string().min(2, {
      message: "Le nom de l'équipement doit contenir au moins 2 caractères",
   }),
});

const AddEquipmentForm = () => {
   const { toast } = useToast();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      axios
         .post("/api/admin/equipment", values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Equipement créé avec succès !",
            });
            setIsLoading(false);
            form.reset();
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la création de l'équipement'",
            });
            setIsLoading(false);
         });
   }

   return (
      <Form {...form}>
         <form
            className="flex items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            {/* Input */}
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Nom de l'équipement{" "}
                        <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input placeholder="Wifi, lave-linge..." {...field} />
                     </FormControl>
                     <FormDescription className="text-xs">Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* Submit */}
            <Button disabled={isLoading} className="mt-2">
               {isLoading ? (
                  // Pendant le chargement
                  <>
                     <Loader2 className="mr-2 h-4 w-4" />
                     En cours
                  </>
               ) : (
                  // Sans chargement
                  <>
                     <Pen className="mr-2 h-4 w-4" />
                     Ajouter
                  </>
               )}
            </Button>
         </form>
      </Form>
   );
};

export default AddEquipmentForm;
