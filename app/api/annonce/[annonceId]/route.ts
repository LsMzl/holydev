/**
 * Fichier contenant les méthodes permattent la mise à jour et la suppression d'une annonce.
 * 1 Méthode PATCH pour la mise à jour.
 * 1 Méthode DELETE pour la supression.
 * @creation 02.06.2024 Louis Mazzella
 */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
   req: Request,
   { params }: { params: { annonceId: string } }
) {
   try {
      // Récuperation des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();
      // const ownerId = userId

      //! Pas d'annonce trouvée
      if (!params.annonceId) {
         return new NextResponse("Identifiant de l'annonce non trouvé", {
            status: 401,
         });
      }

      //! Pas d'utilisateur trouvé
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const house = await db.house.update({
         where: {
            id: params.annonceId,
         },
         data: {
            ...body,
         },
      });
      const category = await db.categoriesOnHouses.create({
         data: {
            categoryId: body.categoryId,
            houseId: house.id,
         },
      });

      return NextResponse.json({
         house,
         category,
      });
   } catch (error) {
      console.log("Error at api/annonce/annonceId PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

export async function DELETE(
   req: Request,
   { params }: { params: { annonceId: string } }
) {
   try {
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();
      // const ownerId = userId

      //! Pas d'annonce trouvée
      if (!params.annonceId) {
         return new NextResponse("Identifiant de l'annonce non trouvé", {
            status: 401,
         });
      }

      //! Pas d'utilisateur trouvé
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const house = await db.house.delete({
         where: {
            id: params.annonceId,
         },
      });

      return NextResponse.json(house);
   } catch (error) {
      console.log("Error at api/annonce/annonceId DELETE", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
