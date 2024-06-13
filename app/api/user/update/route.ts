import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
   try {
      // Récuperarion des informations depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      //! Pas d'utilisateur connecté
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const user = await db.user.update({
         where: {
            clerkId: userId,
         },
         data: {
            ...body,
         },
      });

      return NextResponse.json(user);
   } catch (error) {
      console.log("Error at api/user/update PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
