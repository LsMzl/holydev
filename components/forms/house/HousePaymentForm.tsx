"use client";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useBookHouse from "@/hooks/useBookHouse";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import moment, { locale } from "moment";
import "moment/locale/fr";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface HousePaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const HousePaymentForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: HousePaymentFormProps) => {
  const { bookingHouseData, resetBookHouse } = useBookHouse();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Vérification que stripe fonctionne au lancement de la page
  useEffect(() => {
    //! Pas de stripe
    if (!stripe) {
      return;
    }
    //! Pas de client secret
    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
    setIsLoading(false);
  }, [stripe]);

  /** Soumission du formulaire */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    //! Pas de stripe, ou informations de réservation
    if (!stripe || !elements || !bookingHouseData) {
      return;
    }

    try {
      // Paiement
      stripe
        .confirmPayment({ elements, redirect: "if_required" })
        .then((result) => {
          //* payment succes
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent.id}`)
              .then((res) => {
                toast({
                  variant: "success",
                  description: "Paiement effectué avec succès!",
                });
                router.refresh();
                // Mise à zéro du local storage
                resetBookHouse();
                handleSetPaymentSuccess(true);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log("error", error);
                toast({
                  variant: "destructive",
                  description:
                    "Une erreur s'est produite lors du paiement. Veuillez réessayer",
                });
                setIsLoading(false);
              });
            //! Erreur de paiement
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  //! Pas de date de début ou de fin de réservation
  if (!bookingHouseData?.startDate || !bookingHouseData?.endDate) {
    return <div>Erreur: Dates de réservation manquantes...</div>;
  }

  moment().locale("fr");
  const startDate = moment(bookingHouseData?.startDate).format(
    "dddd DD.MM.YYYY"
  );
  const endDate = moment(bookingHouseData?.endDate).format("dddd DD.MM.YYYY");

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      {/* Formulaire */}
      <div className=" border rounded-lg p-5 mb-5 shadow">
        <h2 className="font-medium mb-2 text-lg">Adresse de facturation</h2>
        <AddressElement
          options={{
            mode: "billing",
          }}
        />
        <div className="">
          <h2 className="font-medium mb-2 mt-4 text-lg">
            Informations de paiement
          </h2>
          <PaymentElement
            id="payment-element"
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 mb-5">
          <h2 className="font-medium mb-1 text-lg">Résumé de la réservation</h2>
          <p className="font-light text-sm">
            L'accueil dans le logement est prévu le {startDate} à 17 heures.
          </p>
          <p className="font-light text-sm">
            Le départ est prévu le {endDate} à 17 heures.
          </p>
        </div>
        <Separator />

        {/* Prix Total */}
        <div className="my-5 flex items-center gap-1">
          <p className="font-semibold text-lg ">Prix total:</p>
          <p>{bookingHouseData?.totalPrice} €</p>
        </div>
      </div>

      {isLoading && (
        <Alert className="bg-indigo-600 text-white">
          <AlertTitle>Paiement en cours</AlertTitle>
          <AlertDescription>
            Paiement en cours, merci de rester sur cette page durant le
            traitement
          </AlertDescription>
        </Alert>
      )}
      {/* Validation du paiement */}
      <Button disabled={isLoading} className="px-10 text-md">
        {isLoading ? "En cours..." : "Valider"}
      </Button>
    </form>
  );
};

export default HousePaymentForm;
