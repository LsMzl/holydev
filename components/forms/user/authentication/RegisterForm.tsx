"use client";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
   email: z.string().email({
      message: "Veuillez entrer une adresse email valide",
   }),
   password: z.string().min(8, {
      message: "Votre mot de passe doit contenir au moins 8 caractères",
   }),
   code: z.string(),
});

const RegisterForm = () => {
   const { isLoaded, signUp, setActive } = useSignUp();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [pendingVerification, setPendingVerification] = useState(false);
   const [code, setCode] = useState("");
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         code: "",
      },
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (!isLoaded) {
         return;
      }

      try {
         await signUp.create({
            emailAddress: values.email,
            password: values.password,
         });

         // Code de vérification
         await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
         });

         // Changement de formulaire
         setPendingVerification(true);
      } catch (error) {
         console.log(error);
      }
   };

   // Verify User email code
   const onPressVerify = async (values: z.infer<typeof formSchema>) => {
      if (!isLoaded) {
         return;
      }

      try {
         const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: values.code,
         });

         if (completeSignUp.status !== "complete") {
            console.log(JSON.stringify(completeSignUp, null, 2));
         }

         if (completeSignUp.status === "complete") {
            await setActive({ session: completeSignUp.createdSessionId });
            // Redirection vers l'onboarding
            router.push("/bienvenue");
         }
      } catch (error) {
         console.log(JSON.stringify(error, null, 2));
      }
   };

   return (
      <div className="border py-8 px-10 rounded-xl shadow-xl w-[400px]">
         <div className="text-center mb-8 space-y-1">
            <h1 className="text-lg font-semibold">Inscription à Holydevs</h1>
            <p className="text-xs text-gray-500 font-light">
               Bienvenue ! Inscrivez-vous pour accéder à toutes les
               fonctionnalités
            </p>
         </div>
         {/* Socials */}
         <div className="border h-10 rounded"></div>
         {!pendingVerification && (
            <div>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="flex flex-col gap-5"
                  >
                     <div>
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-xs">
                                    Email
                                 </FormLabel>
                                 <FormControl>
                                    <Input {...field} suffix={<MailIcon />} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div>
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-xs">
                                    Mot de passe
                                 </FormLabel>
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
                     </div>
                     <Button className="mt-3" size="sm" type="submit">
                        <div className="flex items-center gap-1">
                           <p>Continuer</p>
                           <ArrowBigRight size={15} />
                        </div>
                     </Button>
                  </form>
               </Form>
               <div className="text-sm font-medium mt-5">
                  <p>
                     Déjà inscrit, connectez-vous{" "}
                     <Link href={"/sign-in"} className="underline">
                        {" "}
                        ici
                     </Link>
                  </p>
               </div>
            </div>
         )}

         {pendingVerification && (
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onPressVerify)}
                  className="flex flex-col gap-5"
               >
                  <FormField
                     control={form.control}
                     name="code"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs">
                              Code de vérification
                           </FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button className="mt-3" size="sm" type="submit">
                     <div className="flex items-center gap-1">
                        <p>Vérifier l'email</p>
                        <ArrowBigRight size={15} />
                     </div>
                  </Button>
               </form>
            </Form>
         )}
      </div>
   );
};

export default RegisterForm;
