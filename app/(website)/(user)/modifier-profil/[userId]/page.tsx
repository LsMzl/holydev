import UpdateUserForm from '@/components/forms/user/UpdateUserForm';
import { getUserById } from '@/queries/getUserById';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

interface ModifProfileProps {
    params: {
      userId: string;
    };
  }

const ModifProfile = async ({ params }: ModifProfileProps) => {
  const user = await getUserById(params.userId);

  // Session user id
  const { userId } = auth();

  if (!userId) {
    return (
      <p>
        Vous n'êtes pas connecté.
      </p>
    );
  }

  //? Id utilisateur en base de données != id utilisateur connecté
  if (user && user.id!== userId) {
    return (
      <p>
        Accès refusé.
      </p>
    );
  }

  return (
    <div><UpdateUserForm user={user}/></div>
  )
}

export default ModifProfile

