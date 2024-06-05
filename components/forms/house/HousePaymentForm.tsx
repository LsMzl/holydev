"use client";
// Components
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Hooks
import useBookHouse from "@/hooks/useBookHouse";

// Libraries
import moment from "moment";
import "moment/locale/fr";
import axios from "axios";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

// React/Next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Datas
import { Booking } from "@prisma/client";

interface HousePaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

type DateRangesType = {
  startDate: Date;
  endDate: Date;
};

/**
 * Détermine si des dates se chevauchement au niveau des réservations.
 * @param startDate Date de départ de la réservation.
 * @param endDate Date de fin de la réservation.
 * @param dateRange Plage de dates.
 * @returns
 */
function hasOverlap(
  startDate: Date,
  endDate: Date,
  dateRange: DateRangesType[]
) {
  // Création de l'interval de dates cible
  const targetInterval = {
    start: startOfDay(new Date(startDate)),
    end: endOfDay(new Date(endDate)),
  };
  // Parcours des plages de dates
  for (const range of dateRange) {
    const rangeStart = startOfDay(new Date(range.startDate));
    const rangeEnd = endOfDay(new Date(range.endDate));

    //? Date de départ ou de fin de réservation à l'intérieur de la plage de dates cible = overlaps
    if (
      isWithinInterval(targetInterval.start, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      isWithinInterval(targetInterval.end, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ) {
      return true;
    }
  }
  // Pas de chevauchement
  return false;
}

const HousePaymentForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: HousePaymentFormProps) => {
  // Hooks
  const { bookingHouseData, resetBookHouse } = useBookHouse();
  // Stripe
  const stripe = useStripe();
  const elements = useElements();
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Components
  const { toast } = useToast();
  // Next
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
      //? Chevauchement de dates
      const bookings = await axios.get(
        `api/booking/${bookingHouseData.house.id}`
      );

      const houseBookingsDates = bookings.data.map((booking: Booking) => {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
        };
      });

      const overlapFound = hasOverlap(
        bookingHouseData.startDate,
        bookingHouseData.endDate,
        houseBookingsDates
      );

      //! Chevauchement de dates trouvé
      if (overlapFound) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          description:
            "Certains des jours sélectionnés sont déjà réservés. Veuillez choisir des dates différentes.",
        });
      }

      // Paiement
       stripe
         .confirmPayment({ elements, redirect: "if_required" })
         .then((result) => {
           //* Payment succes
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
