"use client";
import React, { useEffect, useState } from "react";

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
import useLocation from "@/hooks/useLocations";
import { ICity, IState } from "country-state-city";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import HouseOnboardingNav from "../HouseOnboardingNavigation";
import { ComponentsProps } from "@/types/houseOnboardingTypes";
import Image from "next/image";
import House from "@/public/img/house.jpg";
import Glasses from "@/public/img/lunettes.jpg";
import Palmier from "@/public/img/palmier.jpg";
import Van from "@/public/img/van.jpg";

import Logo from "@/public/logo/logo.png";

const formSchema = z.object({
   title: z.string().min(3, {
      message: "Le titre de l'annonce doit contenir au moins 3 caractères",
   }),
   introduction: z.string().optional(),
   description: z.string().min(10, {
      message: "La description doit contenir au moins 10 caractères",
   }),
   country: z.string().min(1, {
      message: "Vous devez sélectionner un pays",
   }),
   state: z.string().min(1, {
      message: "Vous devez sélectionner un état ou département",
   }),
   city: z.string().min(1, {
      message: "La ville est requise",
   }),
   address: z.string().min(1, {
      message: "L'adresse est requise",
   }),
});

const FirstStep = ({
   next,
   previous,
   isFirstStep,
   isFinalStep,
   stepsList,
   getCurrentStep,
   house,
   categories,
   equipements,
}: ComponentsProps) => {
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);
   const { getAllCountries, getCountryStates, getStateCities } = useLocation();

   const countries = getAllCountries();
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: house?.title || "",
         introduction: house.intro || "",
         description: house?.description || "",
         country: house?.country || "",
         state: house?.state || "",
         city: house?.city || "",
         address: house?.address || "",
      },
   });

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      // Récupération des états du pays selectionné
      const countryStates = getCountryStates(selectedCountry);
      if (countryStates) {
         setStates(countryStates);
      }
   }, [form.watch("country")]);

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      const selectedState = form.watch("state");
      // Récupération des villes de l'état selectionné
      const stateCities = getStateCities(selectedCountry, selectedState);
      if (stateCities) {
         setCities(stateCities);
      }
   }, [form.watch("country"), form.watch("state")]);

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("firstStep", values);
      next();
   }

   return (
      <section className="flex flex-col md:flex-row justify-center items-center max-w-7xl m-auto h-screen px-10">
         {/* left section */}
         <div className="flex-1 flex flex-col items-center justify-center rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-background">
            <div>
               <div className="px-10">
                  <h2 className="text-3xl font-semibold mb-2">
                     Création d'annonce
                  </h2>
                  <p className="text-xs text-gray-400 font-light mb-10">
                     Phrase explicative Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Architecto, voluptate. Lorem ipsum dolor
                     sit amet consectetur adipisicing elit. Consectetur tenetur
                     facilis maxime ad hic sunt magni aspernatur minus dolore
                     fugiat ea modi dolor eos voluptatibus nisi sequi suscipit,
                     magnam ut cupiditate.
                  </p>
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
         <div className="flex-1 flex flex-col gap-3 items-center justify-center ">
            <Form {...form}>
               <form className="w-full px-10">
                  <div className="mb-5">
                     <p className="font-semibold">Informations de base</p>
                     {/* Title */}
                     <div>
                        <FormField
                           control={form.control}
                           name="title"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="title">
                                    Titre de l'annonce{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription>
                                    Renseignez un titre pour votre annonce
                                 </FormDescription>
                                 <FormControl>
                                    <Input
                                       placeholder="Maison au bord de la mer..."
                                       id="title"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Introduction */}
                     <div>
                        <FormField
                           control={form.control}
                           name="introduction"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="introduction">
                                    Phrase d'introduction
                                 </FormLabel>
                                 <FormDescription>
                                    Renseignez un titre pour votre annonce
                                 </FormDescription>
                                 <FormControl>
                                    <Input
                                       placeholder="Venez découvrir cette maison située..."
                                       id="introduction"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Description */}
                     <div>
                        <FormField
                           control={form.control}
                           name="description"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="description">
                                    Description{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription>
                                    Renseignez une description pour votre
                                    annonce
                                 </FormDescription>
                                 <FormControl>
                                    <Textarea
                                       id="description"
                                       placeholder="Maison au bord de la mer..."
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Localisation */}
                     <div>
                        <p className="font-semibold">
                           Localisation du logement
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {/* Pays du logement */}
                           <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="hidden"
                                       htmlFor="country"
                                    >
                                       Pays{" "}
                                       <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                       <Select
                                          disabled={isLoading}
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <SelectTrigger className="bg-background">
                                             <SelectValue
                                                placeholder="Pays"
                                                defaultValue={field.value}
                                                id="country"
                                             />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {countries.map((country) => (
                                                <SelectItem
                                                   key={country.isoCode}
                                                   value={country.isoCode}
                                                >
                                                   {country.name}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           {/* Région du logement */}
                           <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="hidden"
                                       htmlFor="state"
                                    >
                                       Région{" "}
                                       <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                       <Select
                                          disabled={
                                             isLoading || states.length < 1
                                          }
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <SelectTrigger className="bg-background">
                                             <SelectValue
                                                placeholder="Région"
                                                defaultValue={field.value}
                                                id="state"
                                             />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {states.map((state) => (
                                                <SelectItem
                                                   key={state.isoCode}
                                                   value={state.isoCode}
                                                >
                                                   {state.isoCode} -{" "}
                                                   {state.name}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           {/* Ville du logement */}
                           <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="hidden"
                                       htmlFor="city"
                                    >
                                       Ville{" "}
                                       <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                       <Select
                                          disabled={
                                             isLoading || cities.length < 1
                                          }
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <SelectTrigger className="bg-background">
                                             <SelectValue
                                                placeholder="Ville"
                                                defaultValue={field.value}
                                                id="city"
                                             />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {cities.map((city) => (
                                                <SelectItem
                                                   key={city.name}
                                                   value={city.name}
                                                >
                                                   {city.name}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     {/* Adresse */}
                     <div>
                        <FormField
                           control={form.control}
                           name="address"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="address">
                                    Adresse de votre logement{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription>
                                    Renseignez l'adresse de votre logement
                                 </FormDescription>
                                 <FormControl>
                                    <Input
                                       placeholder="5 rue de nulle part"
                                       autoComplete="false"
                                       id="address"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
                  <HouseOnboardingNav
                     next={form.handleSubmit(onSubmit)}
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
