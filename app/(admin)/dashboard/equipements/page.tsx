import { DataTable } from '@/components/admin/DataTable'
import PageTitle from '@/components/admin/PageTitle'
import { columns } from '@/components/admin/data-tables/EquipmentColumns'
import AddEquipmentForm from '@/components/admin/forms/AddEquipmentForm'
import { getAllEquipments } from '@/queries/getAllEquipments'

import React from 'react'



export default async function Equipments() {
  const data = await getAllEquipments();
  return (
    <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Equipements" />
         <h3 className="text-xl font-medium">Liste des équipements</h3>
         <DataTable columns={columns} data={data} />
         <h3 className='text-xl font-medium'>Ajouter un équipement</h3>
         <AddEquipmentForm/>

      </div>
  )
}