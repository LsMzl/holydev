import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      // Récuperarion des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();
      // const ownerId = userId

      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const house = await db.house.create({
         data: {
            title: body.title,
            introduction: body.introduction,
            description: body.description,
            country: body.country,
            state: body.state,
            city: body.city,
            address: body.address,
            ownerId: userId,
         },
      });

      return NextResponse.json(house);
   } catch (error) {
      console.log("Error at api/house POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
