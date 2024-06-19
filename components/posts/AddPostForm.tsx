"use client";
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
import Image from "next/image";
import { Separator } from "../ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import {
   Check,
   ImageIcon,
   ImagePlusIcon,
   Loader2,
   SmilePlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface AddPostProps {
   connectedUser: {
      id: string;
      firstName: string;
      profilePicture: string;
   };
}

const formSchema = z.object({
   // Identité
   content: z.string().min(5, {
      message: "Votre post doit contenir au moins 5 caractères",
   }),
   image: z.string().optional(),
});

const AddPostForm = ({ connectedUser }: AddPostProps) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const [files, setFiles] = useState<File[]>([]);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         content: "",
         image: "",
      },
   });

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault();

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files?.[0];
         setFiles(Array.from(e.target.files));

         if (!file.type.includes("image")) return;

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
            localStorage.setItem("image", imageDataUrl);
         };

         fileReader.readAsDataURL(file);
         
      }
   };

   const localImg = localStorage.getItem("image");

   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      axios
         .post(`/api/post`, values)
         .then((res) => {
            setIsLoading(false);
            router.refresh();
            form.reset();
         })
         .catch((err) => {
            console.log(err);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez réessayer plus tard",
            });
            setIsLoading(false);
         });
   }

   return (
      <div className="flex flex-col w-full bg-card/50 p-5 rounded-lg gap-3 pr-2">
         <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
               <Image
                  src={connectedUser.profilePicture}
                  fill
                  sizes="100%"
                  alt={`Photo de ${connectedUser.firstName}`}
                  className="ronded-full object-cover"
               />
            </div>
            <p className="font-medium capitalize text-lg">
               Bonjour {connectedUser.firstName}
            </p>
         </div>
         <Dialog>
            <DialogTrigger>
               <div className="bg-card rounded-xl w-full py-3 px-3 text-start hover:bg-card/50 group">
                  <p className="text-foreground/70 group-hover:text-foreground/80">
                     Que voulez-vous partager avec vos amis ?
                  </p>
               </div>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Créer un post</DialogTitle>
               </DialogHeader>
               <Separator className="my-2" />
               <div>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Contenu du post */}
                        <FormField
                           control={form.control}
                           name="content"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel
                                    className="hidden"
                                    htmlFor="content"
                                 >
                                    Contenu
                                 </FormLabel>
                                 <FormControl className="border-none bg-transparent">
                                    <Textarea
                                       {...field}
                                       rows={3}
                                       id="content"
                                       name="content"
                                       placeholder="Que voulez-vous partager avec vos amis ?"
                                       className="focus-visible:ring-0 focus-visible:ring-offset-0 py-0 text-lg"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        {/* Affichage de l'image si existante */}
                        {localImg != null && (
                           <div className="w-full h-60 mt-5 relative">
                              <Image src={localImg} alt="" fill sizes="100%" className="object-cover rounded-lg"/>
                           </div>
                        )}
                        {/* Bas du formulaire */}
                        <div className="flex justify-between mt-5">
                           {/* Icones */}
                           <div className="flex items-center gap-2">
                              {/* Ajout d'image */}
                              <FormField
                                 control={form.control}
                                 name="image"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel></FormLabel>
                                       <FormControl>
                                          <label
                                             className={cn(
                                                isLoading
                                                   ? "cursor-not-allowed"
                                                   : "cursor-pointer"
                                             )}
                                          >
                                             <div
                                                className="rounded-full bg-card p-2.5 hover:bg-blue-400 transition-colors"
                                                title="Ajouter une image"
                                             >
                                                <ImagePlusIcon size={20} />
                                             </div>

                                             <Input
                                                className="hidden"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                   handleImageSelect(
                                                      e,
                                                      field.onChange
                                                   )
                                                }
                                             />
                                          </label>
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <div className="rounded-full bg-card p-2.5">
                                 <SmilePlusIcon size={20} />
                              </div>
                              <div className="rounded-full bg-card p-2.5">
                                 <ImageIcon size={20} />
                              </div>
                           </div>

                           {/* Button */}
                           <DialogClose>
                              <Button
                                 disabled={isLoading}
                                 className="w-[100px]"
                                 type="submit"
                              >
                                 {isLoading ? (
                                    // Pendant le chargement
                                    <>
                                       <Loader2 className="h-4 w-4" />
                                    </>
                                 ) : (
                                    // Sans chargement
                                    <>
                                       <Check className="mr-2 h-4 w-4" />
                                       Poster
                                    </>
                                 )}
                              </Button>
                           </DialogClose>
                        </div>
                     </form>
                  </Form>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default AddPostForm;
