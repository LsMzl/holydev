import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2, MoveLeft, MoveRight } from "lucide-react";
import React from "react";

interface OnboardingNavProps {
   next?: () => void;
   previous?: () => void;
   isFirstStep?: () => boolean;
   isFinalStep?: () => boolean;
   isLoading?: boolean;
}

const OnboardingNav = ({
   next,
   previous,
   isFirstStep,
   isFinalStep,
   isLoading,
}: OnboardingNavProps) => {
   let textInButtons: string = "";

   //? Première étape
   if (isFirstStep && isFirstStep()) {
      textInButtons = "Go !";
   }
   //? Dernière étape
   else if (isFinalStep && isFinalStep()) {
      textInButtons = "Terminer";
   }
   //? Etapes intermédiaires
   else {
      textInButtons = "Suivant";
   }

   return (
      <div className="">
         <div
            className={clsx(
               // Dernière étape
               previous && !next && "justify-center",
               // Première étape
               !previous && next && "justify-end",
               // Etapes intermédiaires
               previous && next && "justify-between",
               "flex items-center"
            )}
         >
            {/* Bouton retour */}
            {previous && (
               <Button
                  disabled={isLoading}
                  className="w-[110px] group"
                  onClick={() => previous()}
               >
                  {isLoading ? (
                     // Pendant le chargement
                     <>
                        <Loader2 className="mr-2 h-4 w-4" />
                        En cours
                     </>
                  ) : (
                     // Sans chargement
                     <>
                        <MoveLeft className="mr-2 h-4 w-4 group-hover:-translate-x-2" />
                        Retour
                     </>
                  )}
               </Button>
            )}

            {/* Bouton suivant */}
            {next && (
               <Button
                  disabled={isLoading}
                  className="w-[110px] group"
                  onClick={() => next()}
                  type="button"
               >
                  {isLoading ? (
                     // Pendant le chargement
                     <>
                        <Loader2 className="mr-2 h-4 w-4" />
                        En cours
                     </>
                  ) : (
                     // Sans chargement
                     <>
                        {textInButtons}
                        <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-2" />
                     </>
                  )}
               </Button>
            )}
         </div>
      </div>
   );
};

export default OnboardingNav;
