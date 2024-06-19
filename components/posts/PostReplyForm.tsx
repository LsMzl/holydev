"use client";
import { Check, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface PostReplyFormProps {
   postId: string;
   currentUserImage: string;
   currentUserId: string;
}

const formSchema = z.object({
   content: z.string().min(2, {
      message: "Votre réponse doit contenir au moins 2 caractères",
   }),
});

const PostReplyForm = ({
   postId,
   currentUserImage,
   currentUserId,
}: PostReplyFormProps) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         content: "",
      },
   });
   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      axios
         .post(`/api/post/${postId}`, values)
         .then((res) => {
            setIsLoading(false);
            form.reset();
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez réessayer plus tard",
            });
         });
   }
   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 flex items-center justify-start gap-4 border-t py-5 max-xs:flex-col px-5"
         >
            <div className="flex items-center justify-center">
               <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                     <FormItem className="flex items-center justify-center w-full gap-3">
                        <FormLabel htmlFor="content">
                           <Image
                              src={currentUserImage}
                              height={48}
                              width={48}
                              alt={`Photo de profil de l'utilisateur`}
                              className="rounded-full object-cover"
                           />
                        </FormLabel>
                        <FormControl className="border-none bg-transparent ">
                           <Input
                              type="text"
                              {...field}
                              id="content"
                              name="content"
                              placeholder="Votre réponse..."
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 2xl:w-[800px]"
                           />
                        </FormControl>
                     </FormItem>
                  )}
               />
               <Button
                  disabled={isLoading}
                  className="w-[100px] mt-1"
                  type="submit"
               >
                  {isLoading ? (
                     // Pendant le chargement
                     <>
                        <Loader2 className="h-4 w-4" />
                     </>
                  ) : (
                     // Sans chargement
                     <>Répondre</>
                  )}
               </Button>
            </div>
         </form>
      </Form>
   );
};

export default PostReplyForm;
