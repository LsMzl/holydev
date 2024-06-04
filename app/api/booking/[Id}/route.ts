/**
 * Route permettant de mettre à jour ou supprimer une réservation.
 * @creation 04.06.2024 - Louis Mazzella
 */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    // Récupération de l'id de l'utilisateur connecté.
    const { userId } = auth();

    //! Pas de paiement trouvé
    if (!params.Id) {
      return new NextResponse("Payment Intent Id non trouvé", { status: 401 });
    }

    //! Pas d'utilisateur trouvé
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const booking = await db.booking.update({
      where: {
        paymentIntentId: params.Id,
      },
      data: {
        paymentStatus: true,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at api/booking/Id PATCH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    // Récupération de l'id de l'utilisateur connecté.
    const { userId } = auth();
    // const ownerId = userId

    //! Pas d'annonce trouvée
    if (!params.Id) {
      return new NextResponse("Identifiant de réservation non trouvé", {
        status: 401,
      });
    }

    //! Pas d'utilisateur trouvé
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const booking = await db.booking.delete({
      where: {
        id: params.Id,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at api/booking/Id DELETE", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
