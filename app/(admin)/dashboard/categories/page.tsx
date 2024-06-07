'use client'
import PageTitle from '@/components/admin/PageTitle'
import AddCategoryForm from '@/components/admin/forms/AddCategoryForm'
import React from 'react'



export default function Categories() {
  return (
    <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Catégories" />
         <h3 className='text-xl font-medium'>Ajouter une catégorie</h3>
         <AddCategoryForm/>

      </div>
  )
}