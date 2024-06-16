/**
 * Route en POST permettant de créer une nouvelle annonce.
 * Récupération des informations de l'annonce depuis le body.
 * Récupération de l'id de l'utilisateur connecté.
 * @creation 02.06.2024 - Louis Mazzella
 */

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        // Récuperarion des informations de l'annonce depuis le body.
        const body = await req.json()
        // Récupéartion de l'id de l'utilisateur connecté.  
        const {userId} = auth()
        // const ownerId = userId
        

        if(!userId){
            return new NextResponse('Non autorisé', {status: 401})
        }
        console.log(body)

        const house = await db.house.create({
            data: {
                ...body,
                ownerId: userId,
            }
        })
        

        return NextResponse.json({
            house,
        });

    } catch (error) {
        console.log('Error at api/annonce POST', error)
        return new NextResponse('Internal server error', {status: 500})
    }
}