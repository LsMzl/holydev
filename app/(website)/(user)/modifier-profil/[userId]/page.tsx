import UpdateUserForm from '@/components/forms/user/UpdateUserForm';
import React from 'react'

interface ModifProfileProps {
    params: {
      userId: string;
    };
  }

const ModifProfile = ({ params }: ModifProfileProps) => {
  return (
    <div><UpdateUserForm/></div>
  )
}

export default ModifProfile

