import { db } from "@/lib/db";

export const getAllPosts = async () => {
   try {
      const posts = db.post.findMany({
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
            comments: {
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
