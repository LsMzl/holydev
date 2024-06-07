import { User } from "@prisma/client";
import React from "react";

import * as z from "zod";

interface UpdateUserProps {
   user: User | null;
}

const formSchema = z.object({
   firstName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
   lastName: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
   phone: z.string().refine((val) => (val.length = 10), {}),
});

const UpdateUserForm = () => {
   return <div>UpdateUserForm</div>;
};

export default UpdateUserForm;
