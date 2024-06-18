import { db } from "../lib/db";

export const getPostById = async (postId: string) => {
   try {
      const post = await db.post.findUnique({
         where: {
            id: postId,
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

      //! No house found
      if (!post) {
         return null;
      }

      return post;
   } catch (error: any) {
      throw new Error(error);
   }
};
