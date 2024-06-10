/**
 * Route en POST permettant la création d'un utilisateur dans la base de données.
 * Récupération des informations de l'annonce depuis le body.
 * Récupération de l'id de l'utilisateur connecté.
 * @creation 10.06.2024 - Louis Mazzella
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

      //! Pas d'utilisateur connecté
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      // Création de l'utilisateur dans la base de données
      const user = await db.user.create({
         data: {
            ...body,
         },
      });

      return NextResponse.json(user);
   } catch (error) {
      console.log("Error at api/user/onboarding POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}

export async function PATCH() {
	
}