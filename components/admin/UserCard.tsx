import React from "react";


export type UserProps = {
   name: string;
   email: string;
};

const UserCard = (props: UserProps) => {
   return (
      <div className="flex flex-wrap justify-between gap-3 ">
         <section className="flex items-center gap-3 border rounded-lg p-1 w-full">
            <div className="h-12 w-12 rounded-full bg-gray-100 p-1 relative">
               <img
                  src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${props.email}`}
                  alt={`Photo de ${props.name}`}
                  className="rounded-full"
               />
            </div>
               <div className="text-sm">
                  <p>{props.name}</p>
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
                     {props.email}
                  </div>
               </div>
         </section>
      </div>
   );
};

export default UserCard;
