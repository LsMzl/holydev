import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
   ({ className, type, ...props }, ref) => {
      const [showPassword, setShowPassword] = React.useState(false);
      return (
         <Input
            className={className}
            {...props}
            ref={ref}
            suffix={
               showPassword ? (
                  <Eye
                     onClick={() => setShowPassword(false)}
                     className="select-none"
                  />
               ) : (
                  <EyeOff
                     onClick={() => setShowPassword(true)}
                     className="select-none"
                  />
               )
            }
            type={showPassword ? "text" : "password"}
         />
      );
   }
);
Input.displayName = "PasswordInput";

export { PasswordInput };
