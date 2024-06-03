import clsx from "clsx";

interface typoProps {
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "body-xs"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";

  // Permet d'ajouter du texte dans le composant
  children: React.ReactNode;

  // Permet de choisir le type de balise
  balise?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "white" | "black" | "gray" | "primary" | "secondary" | "danger" | "success" | "warning" | "gray-600";
  weight?: "regular" | "medium" | "semibold";
  className?: string;
}

export const Typography = ({
   variant = "body-base",
   balise: Component = "div",
   children,
   theme = "black",
   weight = "regular",
   className,
 }: typoProps) => {
   let variantStyles: string = "";
   let colorStyles: string = "";
 
   switch (variant) {
     case "display":
       variantStyles = "text-8xl";
       break;
     case "h1":
       variantStyles = "text-7xl";
       break;
     case "h2":
       variantStyles = "text-6xl";
       break;
     case "h3":
       variantStyles = "text-5xl";
       break;
     case "h4":
       variantStyles = "text-4xl";
       break;
     case "h5":
       variantStyles = "text-3xl";
       break;
     case "lead":
       variantStyles = "text-2xl";
       break;
     case "body-lg":
       variantStyles = "text-lg";
       break;
     // Texte par défaut
     case "body-base":
       variantStyles = "text-base";
       break;
     case "body-sm":
       variantStyles = "text-sm";
       break;
       case "body-xs":
       variantStyles = "text-xs";
       break;

   }
 
   switch (theme) {
     case "white":
       colorStyles = "text-white";
       break;
       // Couleur par defaut
     case "black":
       colorStyles = "text-gray";
       break;
     case "gray":
       colorStyles = "text-gray-700";
       break;
       case "gray-600":
       colorStyles = "text-gray-600";
       break;
     case "primary":
       colorStyles = "text-primary";
       break;
     case "secondary":
       colorStyles = "text-secondary";
       break;
       case "danger":
         colorStyles = "text-alert-danger";
       break;
       case "success":
         colorStyles = "text-alert-succes";
       break;
       case "warning":
         colorStyles = "text-alert-warning";
       break;
   }
 
   return (
     <Component
       className={clsx(
         variantStyles,
         colorStyles,
         weight === "medium" && "font-medium",
         className
       )}
     >
       {children}
     </Component>
   );
 };