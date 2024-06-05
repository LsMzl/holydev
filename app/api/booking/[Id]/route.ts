/**
 * Route permettant de mettre à jour ou supprimer une réservation.
 * @creation 04.06.2024 - Louis Mazzella
 */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/** Mise à jour d'une réservation */
export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    // Récupération de l'id de l'utilisateur connecté.
    const { userId } = auth();

    //! Pas de réservation trouvé
    if (!params.Id) {
      return new NextResponse("Identifiant de réservation non trouvé", { status: 401 });
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

export async function GET(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    // Récupération de l'id de l'utilisateur connecté.
    const { userId } = auth();

    //! Pas de réservation trouvé
    if (!params.Id) {
      return new NextResponse("Identifiant de réservation non trouvé", { status: 401 });
    }

    //! Pas d'utilisateur trouvé
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    // Réservations d'aujourd'hui
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const booking = await db.booking.findMany({
      where: {
        paymentStatus: true,
        houseId: params.Id,
        endDate: {
          gt: yesterday,
        },
      },

    });

    return NextResponse.json(booking);
  } catch (error) {
    console.log("Error at api/booking/Id GET", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

/** Suppression d'une réservation */
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
