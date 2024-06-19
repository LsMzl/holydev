import { db } from "@/lib/db";

export const getAllPosts = async () => {
   try {
      const posts = db.post.findMany({
         orderBy:{
            createdAt: 'asc'
         },
         include: {
            author: {
               select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  pseudo: true,
                  profilePicture: true,
               },
            },
            children: {
               include: {
                  author: {
                     select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        pseudo: true,
                        profilePicture: true,
                     },
                  },
               },
            },
            likes:{
               select: {
                  id: true,
               }
            },
         }
      });
      return posts;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
