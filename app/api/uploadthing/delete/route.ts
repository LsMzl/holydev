/**
 * Route pour la suppression des images uploadées lors de la création d'une annonce de location.
 */

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
   const { userId } = auth();

   if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 }); //? Status: non authorisé
   }
   // Image à supprimer
   const { imageKey } = await req.json();

   try {
      const res = await utapi.deleteFiles(imageKey);
      return NextResponse.json(res);
   } catch (error) {
      console.log("Erreur lors de la suppression à uploadthing/delete", error);
      return new NextResponse("Internal server error", { status: 500 }); //? Status: Erreur interne serveur
   }
}