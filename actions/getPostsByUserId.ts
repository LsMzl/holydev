import { db } from "../lib/db";

export const getPostsByUserId = async (userId: string) => {
   try {
      const posts = await db.post.findMany({
         where: {
            authorId: userId,
         },
         orderBy: {
            createdAt: "desc",
         },
         include: {
            author: true,
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
            likes: true,
         },
      });

      //! No house found
      if (!posts) {
         return null;
      }

      return posts;
   } catch (error: any) {
      throw new Error(error);
   }
};
