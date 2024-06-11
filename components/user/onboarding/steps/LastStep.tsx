"use client";

// React / Next
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Types
import { ComponentsProps } from "@/types/onboardingTypes";

// Components
import OnboardingNav from "../navigation/OnboardingNav";
import { toast } from "@/components/ui/use-toast";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
} from "@/components/ui/form";

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
   isOnboardingCompleted: z.boolean(),
});

const LastStep = ({ isFinalStep }: ComponentsProps) => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         isOnboardingCompleted: false,
      },
   });

   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const router = useRouter();

   function handleCloseOnboarding(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      values.isOnboardingCompleted = true;
      axios
         .patch(`api/user/onboarding`, values)
         .then((res) => {
            setIsLoading(false);
            router.push("/");
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description: "Oups, une erreur est survenue...",
            });
            setIsLoading(false);
         });
   }
   return (
      <section className="flex flex-col items-center">
         <h1 className="text-5xl font-medium mb-3 leading-8">
            Félicitations !
         </h1>
         <p className="mb-7 text-center">
            Vous pouvez dès à présent profiter pleinement de la plateforme et
            échanger avec nos membres
         </p>
         <Form {...form}>
            <form>
               <FormField
                  control={form.control}
                  name="isOnboardingCompleted"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="hidden">
                           Terminer onboarding
                        </FormLabel>
                        <FormControl></FormControl>
                     </FormItem>
                  )}
               />
               <OnboardingNav
                  next={form.handleSubmit(handleCloseOnboarding)}
                  isFinalStep={isFinalStep}
               />
            </form>
         </Form>
      </section>
   );
};

export default LastStep;
