"use client";
// Components
import { Input } from "@/components/ui/input";
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

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/passwordInput";
import { ComponentsProps } from "@/types/onboardingTypes";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
   firstName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 2 caractères",
   }),
   lastName: z.string().min(2, {
      message: "Votre nom de famille doit contenir au moins 2 caractères",
   }),
   pseudo: z.string().min(4, {
      message: "Votre pseudo doit contenir au moins 4 caractères",
   }),
   email: z.string().email({
      message: "Votre email n'est pas valide",
   }),
   phone: z.string().min(10, {
      message: "Votre numéro de téléphone n'est pas valide",
   }),
});

const FirstStep = ({
   next,
   previous,
   isFirstStep,
   isFinalStep,
   stepsList,
   getCurrentStep,
   user,
   dbUser,
}: ComponentsProps) => {
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstName: dbUser?.firstName || "",
         lastName: dbUser?.lastName || "",
         pseudo: dbUser?.pseudo || "",
         email: user?.email || "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("onSubmit", values);
      setIsLoading(true);
      axios
         .post("/api/user/onboarding", values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Super, plus qu'une étape !",
            });
            setIsLoading(false);
            next();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description: "Une erreur s'est produite",
            });
            setIsLoading(false);
         });
   }

   return (
      <section className="flex flex-col md:flex-row md:mx-10 md:gap-5 mx-4 lg:mx-0">
         {/* Left section */}
         <div className="mb-3 md:mb-6 lg:mb-0">
            <div className=" md:w-[350px] m-auto ">
               <h1 className=" text-center md:text-start text-3xl md:text-4xl font-medium mb-3">
                  Avant tout, <br /> Qui êtes-vous ?
               </h1>
               <p className="text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consequatur impedit adipisci ab, cupidite.
               </p>
            </div>

            <OnboardingNav />
         </div>
         {/* Right section */}
         <div className="">
            <Form {...form}>
               <form className="space-y-3 md:space-y-5 mb-5 md:mb-10">
                  {/* Nom et prénom */}
                  <div className="grid grid-cols-2 gap-5">
                     <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 Nom de famille{" "}
                                 <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 Prénom <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name="pseudo"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Pseudo <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Maison au bord de la mer..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  {/* Mail et phone */}
                  <div className="grid grid-cols-2 gap-5">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 Email <span className="text-red-500">*</span>
                              </FormLabel>
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
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Numéro de téléphone</FormLabel>
                              <FormControl>
                                 <Input placeholder="0123456789" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
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

export default FirstStep;
