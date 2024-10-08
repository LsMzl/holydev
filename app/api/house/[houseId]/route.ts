/**
 * Fichier contenant les méthodes permattent la mise à jour et la suppression d'une annonce.
 * 1 Méthode PATCH pour la mise à jour.
 * 1 Méthode DELETE pour la supression.
 * @creation 02.06.2024 Louis Mazzella
 */

import { db } from "@/lib/db";
import { getHouseById } from "@/queries/getHouseById";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
   req: Request,
   { params }: { params: { houseId: string } }
) {
   try {
      // Récuperation des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      //! Pas d'annonce trouvée
      if (!params.houseId) {
         return new NextResponse("Identifiant de l'annonce non trouvé", {
            status: 401,
         });
      }

      console.log("body", body);

      //! Pas d'utilisateur trouvé
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      // Update house
      const house = await db.house.update({
         where: {
            id: params.houseId,
         },
         data: {
            image: body.image,
            bedroom: body.bedroom,
            kitchen: body.kitchen,
            bathroom: body.bathroom,
            price: body.price,
            isAvailable: body.isAvailable,
         },
      });

      //? Passage de l'utilisateur à propriétaire si maison disponible
      if (body.isAvailable === true) {
         await db.user.update({
            where: {
               clerkId: userId,
            },
            data: {
               isOwner: true,
            },
         });
      }

      await db.typesOnHouses.create({
         data: {
            houseId: params.houseId,
            houseTypeName: body.types,
         },
      });

      await db.categoriesOnHouses.create({
         data: {
            houseId: params.houseId,
            categoryName: body.categories,
         },
      });

      await db.featuresOnHouses.createMany({
         data: body.equipements.map((feature: any) => ({
            houseId: params.houseId,
            featureName: feature,
         })),
      });

      return NextResponse.json(house);
   } catch (error) {
      console.log("Error at api/annonce/annonceId PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
