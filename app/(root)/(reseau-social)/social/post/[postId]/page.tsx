import { getPostById } from "@/actions/getPostById";
import PostCard from "@/components/posts/PostCard";
import PostReplyFrom from "@/components/posts/PostReplyForm";
import { getUserByClerkId } from "@/queries/getUserByClerkId";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function PostPage({ params }: { params: { postId: string } }) {
    if(!params.postId) return null;

    const user = await currentUser();
    if(!user) return null;

    const connectedUser = await getUserByClerkId(user.id);
    
    const post = await getPostById(params.postId);

    if (!post) {
         return null;
      }



   return (
      <section className="relative mt-10">
         <div>
            <PostCard
               key={post.id}
               id={post.id}
               currentUserId={user?.id ?? ""}
               content={post.content}
               image={post.image}
               author={post.author}
               createdAt={post.createdAt}
               comments={post.comments}
               likes={post.likes}
            />
         </div>
         <div className="mt-7 ">
            <PostReplyFrom 
            postId={post.id}
            currentUserImage={connectedUser?.profilePicture ?? ""}
            currentUserId={connectedUser?.id ?? ""}/>
         </div>
      </section>
   );
}
