import { db } from "@/lib/db";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextResponse } from "next/server";

/**
 * Permet d'ajouter des réponses aux posts.
 *
 * @param req
 * @returns
 */
export async function POST(
   req: Request,
   { params }: { params: { postId: string } }
) {
   try {
      // Récuperarion des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      //! Pas d'annonce trouvée
      if (!params.postId) {
         return new NextResponse("Identifiant du post non trouvé", {
            status: 401,
         });
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
            parent: {
               connect: {
                  id: params.postId,
               }
            }
         }
      });

      

      return NextResponse.json(post);
   } catch (error) {
      console.log("Error at api/opinion/[houseId] POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
