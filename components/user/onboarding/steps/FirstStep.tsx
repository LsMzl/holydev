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
import { Eye, Mail, Phone } from "lucide-react";
import { PasswordInput } from "@/components/ui/passwordInput";
import { ComponentsProps } from "@/types/onboardingTypes";

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
   password: z.string().min(8, {
      message: "Votre mot de passe doit contenir au moins 8 caractères",
   }),
});

const FirstStep = ({
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
         firstName: "",
         lastName: "",
         pseudo: "",
         email: "",
         phone: "",
         password: "",
      },
   });
   return (
      <section className=" flex gap-5">
         {/* Left section */}
         <div className="">
            <div className="w-[440px] m-auto ">
               <h1 className="text-4xl font-medium mb-3">
                  Avant tout, <br /> Qui êtes-vous ?
               </h1>
               <p className="text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                  consequatur impedit adipisci ab, cupiditate maiores.
               </p>
            </div>

            <OnboardingNav />
         </div>
         {/* Right section */}
         <div className="">
            <Form {...form}>
               <form className="space-y-5 mb-10">
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
                  {/* Password */}
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Mot de passe{" "}
                              <span className="text-red-500">*</span>
                           </FormLabel>
                           <FormDescription>
                              Doit contenir au moins 8 caractères
                           </FormDescription>
                           <FormControl>
                              <PasswordInput
                                 placeholder="Mot de passe"
                                 {...field}
                                 type="password"
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
      </section>
   );
};

export default FirstStep;
