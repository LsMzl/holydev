"use client";
import React, { useState } from "react";

// Components
import { Nav } from "./Nav";
import { Button } from "../ui/button";

// Icons
import {
   Archive,
   ChevronLeft,
   ChevronRight,
   LayoutDashboard,
   MessageSquareText,
   MessagesSquare,
   Settings,
   ShoppingCart,
   Tag,
   Users2,
} from "lucide-react";

// Libraries
import { useWindowWidth } from "@react-hook/window-size";

const SideNavBar = () => {
   const [isCollapsed, setIsCollapsed] = useState(false);

   const onlyWidth = useWindowWidth();
   const isMobile = onlyWidth <= 768;

   function toggleSideBar() {
      setIsCollapsed(!isCollapsed);
   }

   return (
      <div className="relative min-w-[80px] border-r pl-4 pr-8 pb-10 pt-24">
         {!isMobile && (
            <Button
               variant="secondary"
               className="rounded-full p-2 absolute -right-[20px] top-7"
               onClick={() => toggleSideBar()}
            >
               {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
         )}
         <Nav
            isCollapsed={isMobile ? true : isCollapsed}
            links={[
               {
                  title: "Dashboard",
                  icon: LayoutDashboard,
                  variant: "ghost",
                  href: "/dashboard",
               },
               {
                  title: "Users",
                  icon: Users2,
                  variant: "ghost",
                  href: "/dashboard/users",
               },
               {
                  title: "Commentaires",
                  icon: MessageSquareText,
                  variant: "ghost",
                  href: "/dashboard/comments",
               },

               {
                  title: "Réservations",
                  icon: ShoppingCart,
                  variant: "ghost",
                  href: "/dashboard/orders",
               },
               {
                  title: "Catégories",
                  icon: Tag,
                  variant: "ghost",
                  href: "/dashboard/categories",
               },
               {
                  title: "Equipements",
                  icon: Archive,
                  variant: "ghost",
                  href: "/dashboard/equipements",
               },
               {
                  title: "Annonces",
                  icon: MessagesSquare,
                  variant: "ghost",
                  href: "/dashboard/annonces",
               },
               {
                  title: "Settings",
                  icon: Settings,
                  variant: "ghost",
                  href: "/dashboard/settings",
               },
            ]}
         />
      </div>
   );
};

export default SideNavBar;
