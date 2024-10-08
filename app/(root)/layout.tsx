import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/provider/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Responsive from "@/components/utils/Responsive";
import { cn } from "@/lib/utils";
import TopNav from "@/components/navigation/TopNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { shouldRedirectToOnboarding } from "@/components/utils/isUserInDatabase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Holydevs",
   description: "Le réseau social de l'immobilier",
};

export default async function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Informations utilisateur
   const { userId } = auth();
   const user = await getUserByClerkId(userId ?? "");

   shouldRedirectToOnboarding(
      userId ?? "",
      user?.clerkId ?? "",
      user?.isOnboardingCompleted ?? false
   );

   return (
      <ClerkProvider>
         <html lang="fr">
            <body className={cn("w-full min-h-screen", inter.className)}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  {/* <Responsive /> */}
                  <TopNav
                     userAvatar={user?.profilePicture ?? ""}
                     userClerkId={userId ?? ""}
                     userMail={user?.email ?? ""}
                     firstname={user?.firstName ?? ""}
                     lastname={user?.lastName ?? ""}
                  />
                  {children }
                  <Toaster />
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
