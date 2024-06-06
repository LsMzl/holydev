"use client";
import { DollarSign, Eye, FileText, Users2 } from "lucide-react";
import { CardProps } from "../Card";

export const cardData: CardProps[] = [
   {
      label: "Total revenus",
      amount: "€ 24,598.89",
      description: "+20% depuis le mois dernier",
      icon: DollarSign,
   },
   {
      label: "Nouveaux inscrits",
      amount: "+2350",
      description: "+180% depuis le mois dernier",
      icon: Users2,
   },
   {
      label: "Annonces",
      amount: "12,857",
      description: "+47% depuis le mois dernier",
      icon: FileText,
   },
   {
    label: "Visiteurs",
    amount: "124,248",
    description: "+89% depuis le mois dernier",
    icon: Eye,
 },
];
