/**
 * Route en POST permettant de créer de nouveaux équipements.
 * Récupération des informations de la catégorie depuis le body.
 * Formulaire réservé administateur.
 * @creation 07.06.2024 - Louis Mazzella
 */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      // Récuperarion des informations depuis le body.
      const body = await req.json();
      // Récupéartion de l'id de l'utilisateur connecté.
      const { userId } = auth();

      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const equipment = await db.equipment.create({
         data: {
            ...body,
         },
      });

      return NextResponse.json(equipment);
   } catch (error) {
      console.log("Error at api/admin/equipment POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
