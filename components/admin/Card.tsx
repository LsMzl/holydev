import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export type CardProps= {
   label: string;
   amount: string;
   description: string;
   icon: LucideIcon;
};

const Card = (props: CardProps) => {
   return (
      <CardContent>
         <section className="flex justify-between items-center">
            {/* Label */}
            <p className="text-sm">{props.label}</p>
            {/* Icon */}
            <props.icon className="h-4 w-4 text-gray-400" />
         </section>
         <section className="flex flex-col gap-1">
            <p className="text-2xl font-medium">{props.amount}</p>
				<p className="text-xs text-gray-500">{props.description}</p>
         </section>
      </CardContent>
   );
};

export default Card;

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         {...props}
         className={cn(
            "flex w-full flex-col gap-3 rounded-xl shadow p-5 border",
            props.className
         )}
      />
   );
}
