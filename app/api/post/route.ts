import { db } from "@/lib/db";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      // Récuperarion des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const user = await getUserByClerkId(userId);
      const dbUser = {
         id: user?.id,
      };

      const post = await db.post.create({
         data: {
            ...body,
            author: {
               connect: {
                  id: dbUser.id,
               },
            },
         },
      });

      return NextResponse.json(post);
   } catch (error) {
      console.log("Error at api/opinion/[houseId] POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
