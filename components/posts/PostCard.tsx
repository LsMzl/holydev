import { Heart, Repeat, Reply, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { comment } from "postcss";
import React from "react";

interface PostCardProps {
   id: string;
   currentUserId: string;
   content: string | null;
   image: string | null;
   author: {
      id: string | null;
      firstName: string | null;
      lastName: string | null;
      pseudo: string | null;
      profilePicture: string | null;
   };
   createdAt: Date;
   comments: {
      author: {
         profilePicture: string | null;
         firstName: string | null;
         lastName: string | null;
         pseudo: string | null;
      };
   }[];
   isComment?: boolean;
   isLiked?: boolean;
   likes: {
      id: string;
   }[];
}

const PostCard = ({
   id,
   currentUserId,
   //    parentId
   content,
   image,
   author,
   createdAt,
   comments,
   likes,
   isComment,
}: PostCardProps) => {
   return (
      <article className="flex w-full flex-col rounded-lg bg-card p-7">
         <div className="flex items-start justify-between">
            <div className="flex-1 w-full flex gap-4">
               <div className="flex flex-col items-center">
                  <Link
                     href={`/user/${author.pseudo}`}
                     className="relative h-11 w-11"
                  >
                     <Image
                        src={author.profilePicture ?? ""}
                        alt={`Photo de profil de ${author.firstName} ${author.lastName}`}
                        fill
                        className="cursor-pointer rounded-full"
                        sizes="100%"
                     />
                  </Link>
                  <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
               </div>

               <div className="flex w-full flex-col">
                  <Link href={`/user/${author.pseudo}`} className="w-fit">
                     <h4 className="capitalize cursor-pointer font-semibold">
                        {author.firstName} {author.lastName}
                     </h4>
                  </Link>
                  <p className="mt-2 text-sm text-gray-700">{content}</p>

                  <div className="mt-5 flex flex-col gap-3">
                     {/* Icons */}
                     <div className="flex gap-3.5">
                        {/* Like */}
                        <Heart size={20} className="cursor-pointer" />
                        {/* Répondre */}
                        <Link
                           href={`/social/post/${id}`}
                           title="Répondre au post"
                        >
                           <Reply size={20} className="cursor-pointer" />
                        </Link>
                        {/* Reposter */}
                        <Repeat size={20} className="cursor-pointer" />
                        {/* Partager */}
                        <Share size={20} className="cursor-pointer" />
                     </div>

                     {/* Affichage des réponses */}
                     {isComment && comments.length > 0 && (
                        <Link href={`/social/post/${id}`}>
                           <p className="mt-1 font-medium text-gray-400">
                              {comments.length} réponses
                           </p>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
};

export default PostCard;
