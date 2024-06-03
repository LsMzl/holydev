'use client'
// Components
import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from "../../utils/uploadthing";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Container from '@/components/elements/Container';
import { Typography } from '@/components/ui/design-system/Typography';
import { Textarea } from '@/components/ui/textarea';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

// React-hook-form
import { useForm } from "react-hook-form";

// Icons
import { Eye, Loader, Loader2, Pen, Trash2 } from 'lucide-react';

// React / Next
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Datas
import { House } from '@prisma/client';

// Libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ICity, IState } from "country-state-city";

// Hooks
import useLocation from '@/hooks/useLocations';



interface AddHouseProps {
  house: House | null;
}


/** Format du formulaire. */
const formSchema = z.object({
  title: z.string().min(3, {
     message: "Le nom de l'annonce doit contenir au moins 3 caractères",
  }),
  description: z.string().min(10, {
     message: "La description doit contenir au moins 10 caractères",
  }),
  address: z.string().min(1, {
     message: "L'adresse est requise",
  }),
  city: z.string().min(1, {
     message: "La ville est requise",
  }),
  country: z.string().min(1, {
     message: "Vous devez sélectionner un pays",
  }),
  state: z.string().min(1, {
     message: "Vous devez sélectionner un état ou département",
  }),
  image: z.string().min(1, {
     message: "Au moins 1 photo est requise",
  }),
});

const AddHouseForm = ({ house }: AddHouseProps) => {

  const { toast } = useToast();
  const router = useRouter();

  const [image, setImage] = useState<string | undefined>();
  const [isImageDeleted, setIsImageDeleted] = useState(false);

   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isHouseDeleting, setIsHouseDeleting] = useState(false);

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();

   const countries = getAllCountries();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //! Ajouter defaultValues: house || {
    defaultValues: house || {
       title: "",
       description: "",
       address: "",
       city: "",
       country: "",
       state: "",
       image: "",
    },
 });

 /** Mise à jour des informations de l'image upoladée */
 useEffect(() => {
  if (typeof image === "string") {
    form.setValue('image',image, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }
}, [image]);


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


/**
 * Envoie des données du formulaire pour la création ou modification d'un annonce.
 * @param values Données du formulaire.
 */
function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true)
  //* Annonce déja existante
  if(house) {
    axios.patch(`/api/annonce/${house?.id}`, values).then((res)=> {
      toast({
        variant:"success",
        description: "Annonce modifiée avec succès !"
      })
      setIsLoading(false)
      router.push(`/annonce/${res.data.id}`)
    }).catch((error)=> {
      console.log(error)
      toast({
        variant:"destructive",
        description: "Une erreur est survenue lors de la modification de l'annonce",
      })
    setIsLoading(false)
    })

  //* Nouvelle annonce
  } else {
    axios.post('/api/annonce', values).then((res)=> {
      toast({
        variant:"success",
        description: "Annonce créée avec succès !"
      })
      setIsLoading(false)
      router.push(`/annonce/${res.data.id}`)
    }).catch((error)=> {
      console.log(error)
      toast({
        variant:"destructive",
        description: "Une erreur est survenue lors de la création de l'annonce",
      })
    setIsLoading(false)
    })
  }
}

/**
 * Fonction de suppression de l'annonce.
 * - Suppression des images de l'annonce.
 * - Suppression de l'annonce.
 * @param house House - Annonce à modifier.
 */
const handleHouseDelete = async (house: House) => {

  setIsHouseDeleting(true)
  // Récupération de l'image
  const getImageKey = (src: string) => src.substring(src.lastIndexOf("/") + 1);

  try {
   
    // Suppression des images
    const imageKey = getImageKey(house.image);
    await axios.post('/api/uploadthing/delete', { imageKey })

    // Suppression de l'annonce
    await axios.delete(`/api/annonce/${house?.id}`)
    toast({
      description: "🎉 Annonce supprimée avec succès !",
      variant: "success",
   });
   router.push('/annonce/new')
    setIsHouseDeleting(false)
  } catch (error) {
    setIsHouseDeleting(false)
    toast({
      description: `😮‍💨 Oups ! Une erreur est survenue, ${error} `,
      variant: "destructive",
   });
    
  }
}

/**
 * Fonction de suppression de l'image uploadée.
 * @param image String - Image à supprimer.
 */
const handlePictureDelete = (image: string) => {
  setIsImageDeleted(true);

  const imageKey = image.substring(image.lastIndexOf("/") + 1);

  // Création de la requête de suppression de l'image
  axios
     .post("/api/uploadthing/delete", { imageKey })
     .then((res) => {
        if (res.data.success) {
           // Remise à zéro de l'image
           setImage("");
           toast({
              description: "🎉 Image supprimée avec succès !",
              variant: "success",
           });
        }
     })
     .catch(() => {
        toast({
           description: `😮‍💨 Oups ! Une erreur est survenue`,
           variant: "destructive",
        });
     })
     .finally(() => {
        setIsImageDeleted(false);
     });
};

  return (
    <Form {...form}>
    <Typography className="text-center mb-5" variant="h4" balise="h1">
      {house ? "Modifier une annonce": "Ajouter une annonce"}
    </Typography>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <Container className="flex flex-col md:flex-row gap-10 p-2 md:p-0">
          {/* Left Section */}
          <div className="space-y-5">
             <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                   <FormItem>
                      <FormLabel>
                         Titre de l'annonce{" "}
                         <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                         Renseignez un titre pour votre annonce
                      </FormDescription>
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
                name="description"
                render={({ field }) => (
                   <FormItem>
                      <FormLabel>
                         Description{" "}
                         <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                         Renseignez une description pour votre annonce
                      </FormDescription>
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
             {/* //TODO Choix de la catégorie, select */}
            
             {/* //TODO Choix des équipements, checkboxes, voir pour afficher la table equipments */}
             <div>
                <FormLabel>Équipements</FormLabel>
                <FormDescription>
                   Cochez les équipements dont dispose votre logement
                </FormDescription>

                {/* <div className="grid grid-cols-2 gap-4 mt-2">
                   <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Wifi</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Animaux acceptés</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Lave-linge</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Parking gratuit</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Caméras de suveillance</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Cuisine aménagée</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Jardin</FormLabel>
                         </FormItem>
                      )}
                   />
                   <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-end gap-3">
                            <FormControl>
                               <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                               />
                            </FormControl>
                            <FormLabel>Terrasse</FormLabel>
                         </FormItem>
                      )}
                   />
                </div> */}
             </div>
          </div>
          {/* Right section */}
          <div className="flex flex-1 flex-col gap-6">
             <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                   <FormItem className="flex flex-col space-y-3">
                      <FormLabel>
                         Photos de votre logement{" "}
                         <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                         Téléchargez au minimum 1 photo de votre logement
                      </FormDescription>
                      <FormControl>
                         {image ? (
                            // Affichage de la photo si elle existe
                            <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                               <Image
                                  src={image}
                                  fill
                                  alt="Photo du logement mis en location"
                                  className="object-contain"
                               />
                               <Button
                                  onClick={() =>
                                     handlePictureDelete(image)
                                  }
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  className="absolute top-0 -right-[12px]"
                               >
                                  {isImageDeleted ? (
                                     <Loader />
                                  ) : (
                                     <Trash2 />
                                  )}
                               </Button>
                            </div>
                         ) : (
                            // Upload des photos
                            <div className="flex flex-col items-center maw-x-[4000px] p-12 border-2 border-dashed border-primary/50 rounded bg-primary/10">
                               <UploadButton
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                     setImage(res[0].url);
                                     toast({
                                        description:
                                           "🎉 Votre image à été ajoutée avec succès",
                                        variant: "success",
                                     });
                                  }}
                                  onUploadError={(error: Error) => {
                                     toast({
                                        description: ` Oups ! ${error.message}`,
                                        variant: "destructive",
                                     });
                                  }}
                               />
                            </div>
                         )}
                      </FormControl>
                      <FormMessage />
                   </FormItem>
                )}
             />
             <Typography
                variant="body-lg"
                balise="h3"
                className="font-semibold"
             >
                Localisation du logement
             </Typography>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* //*Pays du logement */}

                <FormField
                   control={form.control}
                   name="country"
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>
                            Pays <span className="text-red-500">*</span>
                         </FormLabel>
                         <FormDescription>
                            Dans quel pays se trouve votre logement ?
                         </FormDescription>
                         <FormControl>
                            <Select
                               disabled={isLoading}
                               onValueChange={field.onChange}
                               value={field.value}
                               defaultValue={field.value}
                            >
                               <SelectTrigger className="bg-background">
                                  <SelectValue
                                     placeholder="Sélectionnez un pays"
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
                {/* //*Etat du logement */}

                <FormField
                   control={form.control}
                   name="state"
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>
                            Etat/département{" "}
                            <span className="text-red-500">*</span>
                         </FormLabel>
                         <FormDescription>
                            Dans quel état ou département se trouve votre
                            logement ?
                         </FormDescription>
                         <FormControl>
                            <Select
                               disabled={isLoading || states.length < 1}
                               onValueChange={field.onChange}
                               value={field.value}
                               defaultValue={field.value}
                            >
                               <SelectTrigger className="bg-background">
                                  <SelectValue
                                     placeholder="Sélectionnez un département"
                                     defaultValue={field.value}
                                  />
                               </SelectTrigger>
                               <SelectContent>
                                  {states.map((state) => (
                                     <SelectItem
                                        key={state.isoCode}
                                        value={state.isoCode}
                                     >
                                        {state.isoCode} - {state.name}
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
             {/* //*Ville du logement */}

             <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                   <FormItem>
                      <FormLabel>
                         Ville <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                         Dans quel ville se trouve votre logement ?
                      </FormDescription>
                      <FormControl>
                         <Select
                            disabled={isLoading || cities.length < 1}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                         >
                            <SelectTrigger className="bg-background">
                               <SelectValue
                                  placeholder="Sélectionnez une ville"
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
             {/* //* Adresse */}
             <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                   <FormItem>
                      <FormLabel>
                         Adresse de votre logement{" "}
                         <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormDescription>
                         Renseignez l'adresse de votre logement
                      </FormDescription>
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
             {/* //*Submit button */}
             <div className="flex justify-beetween gap-2 flex-wrap">
                {/* //? Si maison existante => modification, sinon => création */}
                {house ? (
                   <Button disabled={isLoading} className="max-w-[150px]">
                      {isLoading ? (
                         // Pendant le chargement
                         <><Loader2 className="mr-2 h-4 w-4" /> Mise à jour</>
                      ) : (
                         // Sans chargement
                         <><Pen className="mr-2 h-4 w-4" />Mettre à jour</>
                      )}
                   </Button>
                ) : (
                   <Button disabled={isLoading} className="max-w-[150px]">
                      {isLoading ? (
                         // Pendant le chargement
                         <><Loader2 className="mr-2 h-4 w-4" />En cours</>
                      ) : (
                         // Sans chargement
                         <><Pen className="mr-2 h-4 w-4" />Créer l'annonce</>
                      )}
                   </Button>
                )}

                {/* //*Bouton de suppression */}
                { house && <Button onClick={() => handleHouseDelete(house)} variant='destructive' type='button' disabled={isHouseDeleting || isLoading}>
                  {
                  isHouseDeleting 
                  ? <><Loader2 className="mr-2 h-4 w-4"/>En cours</> 
                  : <><Trash2 className="mr-2 h-4 w-4" />Supprimer</>
                  }
                  </Button>}

               {/* //* Voir l'annonce */}
               { house && <Button type='button' variant="outline" onClick={() => router.push(`/annonce-details/${house?.id}`)}><Eye className="mr-2 h-4 w-4"/>Voir</Button>}
             </div>
          </div>
       </Container>
    </form>
 </Form>
  )
}

export default AddHouseForm