"use client";
import Container from "@/components/elements/Container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { Loader2, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

interface UpdateUserProps {
   user: User | null;
}

const formSchema = z.object({
   firstName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
   lastName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
});

const UpdateInfosForm = ({ user }: UpdateUserProps) => {
   const { toast } = useToast();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
      },
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      //? Modifications informations utilisateur
      axios
         .patch(`/api/user/${user?.id}`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Informations modifiées avec succès !",
            });
            setIsLoading(false);
            router.push(`/profil/${user?.id}`);
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la modification de vos informations",
            });
            setIsLoading(false);
         });
   };
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               className="font-semibold text-foreground flex gap-1"
            >
               <Pen size={15} />
               Modifier mes infos
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Modification des informations utilisateur
               </DialogTitle>
               <DialogDescription>
                  Expliquez en quelques lignes ce que vous êtes et ce que vous
                  faites.
               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Container className="max-w-3xl flex flex-col mx-auto gap-5">
                     <h3 className="text-xl font-medium mb-5">
                        Modifier le profil
                     </h3>
                     {/* Avatar & Update */}
                     <div className="w-full bg-gray-500 rounded-lg p-2 px-10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Avatar className="bg-gray-200 h-16 w-16">
                              <AvatarImage
                                 src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.email}`}
                              />
                           </Avatar>
                           <div>
                              <p className="text-lg">
                                 {user?.firstName && user?.lastName
                                    ? user?.firstName && user?.lastName
                                    : "Votre nom"}
                              </p>
                              <p>@ls_mzl</p>
                           </div>
                        </div>
                        <Button size="sm">Modifier la photo</Button>
                     </div>
                     {/* Firstname & lastname */}
                     <div className="flex items-center w-full justify-between gap-5">
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Votre nom"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Prénom </FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Votre prénom"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     {/* Email & mobile */}
                     <div className="flex items-center w-full justify-between gap-5">
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="email"
                                          placeholder="votre@email.fr"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Téléphone </FormLabel>
                                    <FormControl>
                                       <Input
                                          type="tel"
                                          placeholder="Numéro de téléphone"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     {/* Biographie */}
                     <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 Description{" "}
                                 <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Maison au bord de la mer..."
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
                              <Loader2 className="mr-2 h-4 w-4" /> Mise à jour
                           </>
                        ) : (
                           // Sans chargement
                           <>
                              <Pen className="mr-2 h-4 w-4" />
                              Mettre à jour
                           </>
                        )}
                     </Button>
                  </Container>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateInfosForm;
