"use client";
import Container from "@/components/elements/Container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { Loader2, Pen, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { ICity, IState } from "country-state-city";
import useLocation from "@/hooks/useLocations";

interface UpdateUserProps {
   lastname: string;
   firstname: string;
   country: string;
   state: string;
   city: string;
   address: string;
   email: string;
   phone: string;
}

const formSchema = z.object({
   // Identité
   firstName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
   lastName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),

   // Localisation
   country: z.string().optional(),
   state: z.string().optional(),
   city: z.string().optional(),
   address: z.string().optional(),

   // Informations de connexion
   email: z.string().optional(),
   phone: z.string().optional(),
});

const UpdateInfosForm = ({
   firstname,
   lastname,
   country,
   state,
   city,
   address,
   email,
   phone,
}: UpdateUserProps) => {
   const { toast } = useToast();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

   const { getAllCountries, getCountryStates, getStateCities } = useLocation();

   const countries = getAllCountries();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         lastName: lastname ?? "",
         firstName: firstname ?? "",
         country: country ?? "",
         state: state ?? "",
         city: city ?? "",
         address: address ?? "",
         email: email ?? "",
         phone: phone ?? "",
      },
   });

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country") ?? "";
      // Récupération des états du pays selectionné
      const countryStates = getCountryStates(selectedCountry);
      if (countryStates) {
         setStates(countryStates);
      }
   }, [form.watch("country")]);

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country") ?? "";
      const selectedState = form.watch("state");
      // Récupération des villes de l'état selectionné
      const stateCities = getStateCities(selectedCountry, selectedState);
      if (stateCities) {
         setCities(stateCities);
      }
   }, [form.watch("country"), form.watch("state")]);

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      //? Modifications informations utilisateur
      axios
         .patch(`../api/user/update`, values)
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
               <DialogDescription className="pb-5">
                  Mettez à jour les données souhaitées et validez une fois
                  terminé
               </DialogDescription>
               <Separator />
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
               >
                  {/* Identity */}
                  <div>
                     <p className="font-semibold">Identité</p>
                     {/* Firstname & lastname */}
                     <div className="flex items-center w-full justify-between gap-5">
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs">
                                       Nom
                                    </FormLabel>
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
                                    <FormLabel className="text-xs">
                                       Prénom{" "}
                                    </FormLabel>
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
                  </div>

                  {/* Localisation */}
                  <div>
                     <p className="font-semibold">Localisation</p>
                     <div className="space-y-1">
                        <div className="flex items-center gap-5">
                           {/* Pays */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="country"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="hidden">
                                          Pays
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
                           </div>
                           {/* Région */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="state"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="hidden">
                                          Etat/département{" "}
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
                           </div>
                           {/* Ville */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="city"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="hidden">
                                          Ville
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
                        <div>
                           <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs">
                                       Adresse{" "}
                                    </FormLabel>

                                    <FormControl>
                                       <Input
                                          placeholder="5 rue de nulle part"
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

                  {/* Email, phone & password */}
                  <div>
                     <p className="font-semibold">Informations de connexion</p>
                     <div className="flex flex-col gap-2">
                        {/* Email & mobile */}
                        <div className="flex items-center w-full justify-between gap-5">
                           {/* Email */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="email"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="text-xs">
                                          Email
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
                           </div>
                           {/* Phone */}
                           <div className="flex-1">
                              <div>
                                 <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="text-xs">
                                             Téléphone{" "}
                                          </FormLabel>
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
                        </div>
                        {/* Passwords */}
                        <div className="flex items-center w-full justify-between gap-5">
                           {/* <div>
                              <FormField
                                 control={form.control}
                                 name="currentPassword"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel className="text-xs">
                                          Mot de passe{" "}
                                       </FormLabel>

                                       <FormControl>
                                          <Input
                                             placeholder="Mot de passe"
                                             {...field}
                                             type="password"
                                             disabled
                                          />
                                       </FormControl>

                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div> */}
                        </div>
                     </div>
                  </div>

                  <DialogFooter>
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
                     <DialogClose asChild>
                        <Button
                           type="button"
                           variant="secondary"
                           className="group"
                        >
                           <X className="mr-2 h-4 w-4 group-hover:animate-spin-fast" />
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

export default UpdateInfosForm;
