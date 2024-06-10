"use client";
import Card, { CardContent } from "@/components/admin/Card";
import Chart from "@/components/admin/Chart";
import PageTitle from "@/components/admin/PageTitle";
import UserCard from "@/components/admin/UserCard";
import { cardData } from "@/components/admin/data/cardData";
// import { userData } from "@/components/admin/data/userData";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
   return (
      <div className="flex flex-col gap-5 w-full">
         <PageTitle title="Dashboard" />
         {/* Cards */}
         <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            {cardData.map((item) => (
               <Card
                  key={uuidv4()}
                  label={item.label}
                  amount={item.amount}
                  description={item.description}
                  icon={item.icon}
               />
            ))}
         </section>
            {/* Chart and last users */}
         <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all">
            <CardContent>
               <p className="p-4 font-medium">Vue d'ensemble</p>
               <Chart />
            </CardContent>
            <CardContent>
               <p className="font-medium">Dernières inscriptions</p>
               <p className="text-xs text-gray-400">295 nouveaux inscrits ce mois-ci</p>
               {/* {userData.map((user) => (
                  <UserCard key={uuidv4()} email={user.email} name={user.name}/>
               ))} */}
            </CardContent>
         </section>
      </div>
   );
}
