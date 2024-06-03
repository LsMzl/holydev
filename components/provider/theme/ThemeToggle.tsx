"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu >
         <DropdownMenuTrigger asChild>
            <p>Changer de thème</p>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center">
            <DropdownMenuItem
               className="cursor-pointer flex items-center gap-2"
               onClick={() => setTheme("light")}
            >
               <Sun size={15} />
               <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
               className="cursor-pointer flex items-center gap-2"
               onClick={() => setTheme("dark")}
            >
               <Moon size={15} />
               <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
               className="cursor-pointer flex items-center gap-2"
               onClick={() => setTheme("system")}
            >
               <SunMoon size={15}/>
               <span>Système</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}