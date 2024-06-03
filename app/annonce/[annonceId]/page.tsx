
import { getHouseById } from '@/app/actions/getHouseById'
import AddHouseForm from '@/components/forms/house/AddHouseForm'
import { Typography } from '@/components/ui/design-system/Typography'
import { auth } from '@clerk/nextjs/server'
import React from 'react'


interface HousePageprops {
    params: {
        annonceId: string
    }
}

const House = async ({params}: HousePageprops) => {

  // Check if the house doesn't exist
  const house = await getHouseById(params.annonceId);
  // Session user id
  const { userId } = auth();

  if (!userId) {
    return (
       <Typography variant="h3" balise="h2">Vous n'êtes pas connecté.</Typography>
    );
 }

 if (house && house.ownerId !== userId) {
  return <Typography variant="h3" balise="h2">Accès refusé.</Typography>
  }

  return <div><AddHouseForm house={house}/></div>

}

export default House