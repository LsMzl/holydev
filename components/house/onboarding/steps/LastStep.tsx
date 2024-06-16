"use client";
import React from "react";

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
import HouseOnboardingNav from "../HouseOnboardingNavigation";
import { ComponentsProps } from "@/types/houseOnboardingTypes";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";
import { Checkbox } from "@/components/ui/checkbox";

import House from "@/public/img/house.jpg";
import Glasses from "@/public/img/lunettes.jpg";
import Palmier from "@/public/img/palmier.jpg";
import Van from "@/public/img/van.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
   // image: z.string().min(1, {
   //    message: "Au moins 1 photo est requise",
   // }),
   bedroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 chambre",
   }),
   kitchen: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 cuisine",
   }),
   bathroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 salle de bain",
   }),
   categories: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
         message: "Vous devez sélectionner au moins 1 catégorie",
      }),
   equipements: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
         message: "You have to select at least one item.",
      }),
   price: z.coerce.number().min(1, {
      message: "Le prix doit être supérieur à 0",
   }),
   isAvailable: z.boolean(),
});

const LastStep = ({
   isFinalStep,
   previous,
   house,
   categories,
   equipements,
}: ComponentsProps) => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         // image: "",
         bedroom: 0,
         kitchen: 0,
         bathroom: 0,
         categories: [],
         equipements: [],
         price: 0,
         isAvailable: true,
      },
   });

   const router = useRouter();

   function closeOnboarding(values: z.infer<typeof formSchema>) {
      console.log("lastStep", values);
      router.push("/");
   }

   return (
      <section className="flex flex-col md:flex-row justify-center items-center max-w-7xl m-auto h-screen px-10">
         {/* left section */}
         <div className="flex-1 flex flex-col items-center justify-center rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-background">
            <div className="">
               <div className="px-10">
                  <h2 className="text-3xl font-semibold mb-2">
                     Dernière étape
                  </h2>
                  <p className="text-sm text-gray-400 font-light">
                     Phrase explicative Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Architecto, voluptate.
                  </p>
                  {/* Récapitulatif */}
                  <div className="border rounded-lg my-5 p-2 bg-card/40">
                     <p className="text-sm font-medium">
                        Récapitulatif de votre annonce:
                     </p>
                     <div className="text-xs p-2">
                        <p className="font-semibold">Titre:</p>
                        <p>{house.title}</p>
                        <p className="font-semibold">Introduction:</p>
                        <p>{house.intro}</p>
                        <p className="font-semibold">Description:</p>
                        <p>{house.description}</p>
                        <p className="font-semibold">Localisation:</p>
                     </div>
                  </div>
               </div>
               {/* Illustrations */}
               <div className="w-full h-96 flex justify-between gap-2">
                  <div className="relative self-start rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={House}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-end rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Glasses}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-start rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Palmier}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-end rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Van}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* Right section */}
         <div className="flex-1 flex flex-col gap-3 items-center justify-center">
            <Form {...form}>
               <form className=" px-10">
                  <div className="mb-5">
                     {/* Nombres de pièces */}
                     <div>
                        <p className="font-medium">Nombre de pièces</p>
                        <div className="flex justify-between gap-5">
                           {/* Chambres */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="bedroom"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="text-xs">
                                          Chambre{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {/* Cuisine */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="kitchen"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="text-xs">
                                          Cuisine{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {/* Salle de bains */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="bathroom"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="text-xs">
                                          Salle de bain{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>
                     {/* Catégories */}
                     <div className="mb-5">
                        <FormField
                           control={form.control}
                           name="categories"
                           render={() => (
                              <FormItem>
                                 <div>
                                    <FormLabel>
                                       Catégories{" "}
                                       <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormDescription className="mt-1">
                                       Cochez les catégories qui représentent
                                       votre logement
                                    </FormDescription>
                                 </div>
                                 <div className="grid grid-cols-3 xl:grid-cols-3 gap-5 mt-2">
                                    {categories.map((category) => (
                                       <FormField
                                          key={uuidv4()}
                                          control={form.control}
                                          name="categories"
                                          render={({ field }) => (
                                             <FormItem
                                                key={uuidv4()}
                                                className="flex flex-row items-end gap-1"
                                             >
                                                <FormControl>
                                                   <Checkbox
                                                      checked={field.value?.includes(
                                                         category.id
                                                      )}
                                                      onCheckedChange={(
                                                         checked
                                                      ) => {
                                                         return checked
                                                            ? field.onChange([
                                                                 ...field.value,
                                                                 category.id,
                                                              ])
                                                            : field.onChange(
                                                                 field.value?.filter(
                                                                    (value) =>
                                                                       value !==
                                                                       category.id
                                                                 )
                                                              );
                                                      }}
                                                   />
                                                </FormControl>
                                                <FormLabel className="text-xs">
                                                   {category.name}
                                                </FormLabel>
                                             </FormItem>
                                          )}
                                       />
                                    ))}
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Equipements */}
                     <div className="mb-5">
                        <FormField
                           control={form.control}
                           name="categories"
                           render={() => (
                              <FormItem>
                                 <div>
                                    <FormLabel>
                                       Equipements{" "}
                                       <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormDescription className="mt-1">
                                       Cochez les équipements dont dispose votre
                                       logement
                                    </FormDescription>
                                 </div>
                                 <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 mt-2">
                                    {equipements.map((equipement) => (
                                       <FormField
                                          key={uuidv4()}
                                          control={form.control}
                                          name="equipements"
                                          render={({ field }) => (
                                             <FormItem
                                                key={uuidv4()}
                                                className="flex flex-row items-end gap-3"
                                             >
                                                <FormControl>
                                                   <Checkbox
                                                      checked={field.value?.includes(
                                                         equipement.id
                                                      )}
                                                      onCheckedChange={(
                                                         checked
                                                      ) => {
                                                         return checked
                                                            ? field.onChange([
                                                                 ...field.value,
                                                                 equipement.id,
                                                              ])
                                                            : field.onChange(
                                                                 field.value?.filter(
                                                                    (value) =>
                                                                       value !==
                                                                       equipement.id
                                                                 )
                                                              );
                                                      }}
                                                   />
                                                </FormControl>
                                                <FormLabel className="text-xs">
                                                   {equipement.name}
                                                </FormLabel>
                                             </FormItem>
                                          )}
                                       />
                                    ))}
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Price */}
                     <div>
                        <FormField
                           control={form.control}
                           name="price"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>
                                    Prix par nuit{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription>
                                    Indiquez le prix par nuit pour votre
                                    logement
                                 </FormDescription>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       min="30"
                                       max="5000"
                                       step="5"
                                       placeholder="130"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Disponibilité */}
                     <div>
                        <FormField
                           control={form.control}
                           name="isAvailable"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>
                                    Rendre votre logement disponible à la
                                    location ?{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription>
                                    Si vous choisissez "non" votre annonce ne
                                    sera pas visible par les autre utilisateurs
                                 </FormDescription>
                                 <FormControl>
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-semibold">
                                          Non
                                       </p>
                                       <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                       />
                                       <p className="text-sm font-semibold">
                                          Oui
                                       </p>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
                  <HouseOnboardingNav
                     next={form.handleSubmit(closeOnboarding)}
                     // previous={previous}
                     isFinalStep={isFinalStep}
                  />
               </form>
            </Form>
         </div>
      </section>
   );
};

export default LastStep;
