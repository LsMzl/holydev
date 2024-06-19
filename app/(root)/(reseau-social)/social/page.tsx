import { getAllPosts } from "@/actions/getAllPosts";
import Spacing from "@/components/elements/Spacing";
import SideNav from "@/components/navigation/SideNav";
import AddPostForm from "@/components/posts/AddPostForm";
import PostCard from "@/components/posts/PostCard";

import { Separator } from "@/components/ui/separator";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Social() {
   // Informations utilisateur
   const { userId } = auth();
   const connectedUser = await getUserByClerkId(userId ?? "");
   const user = await currentUser();

   const connectedUserData = {
      id: connectedUser?.id ?? "",
      firstName: connectedUser?.firstName ?? "",
      profilePicture: connectedUser?.profilePicture ?? "",
   };

   // Récupération des posts
   const posts = await getAllPosts();

   return (
      <div className="">
         {/* Formulaire d'ajout de post */}
         <AddPostForm connectedUser={connectedUserData} />

         <Separator className="my-10" />

         {/* Tous les posts */}
         <section className="flex flex-col gap-5">
            {posts.length === 0 ? (
               <p>Aucun post à afficher pour le moment...</p>
            ) : (
               <>
                  {posts.map((post) => (
                     <PostCard
                        key={post.id}
                        id={post.id}
                        currentUserId={user?.id ?? ""}
                        content={post.content}
                        parentId={post.parentId}
                        image={post.image}
                        author={post.author}
                        createdAt={post.createdAt}
                        comments={post.children}
                        likes={post.likes}
                     />
                  ))}
               </>
            )}
         </section>
      </div>
   );
}
