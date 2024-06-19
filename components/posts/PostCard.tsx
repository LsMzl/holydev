import { Heart, Repeat, Reply, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface PostCardProps {
   id: string;
   currentUserId: string;
   parentId: string | null;
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
   parentId,
   content,
   image,
   author,
   createdAt,
   comments,
   isComment,
   likes,
}: PostCardProps) => {
   return (
      <article
         className={`flex w-full flex-col rounded-lg bg-card pr-[65px] ${
            isComment ? "p-5 ml-10 mb-5" : "bg-card/50 p-7 "
         }`}
      >
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
                  <p className="text-xs text-foreground/40">Publié le</p>
                  <p className="mt-2 text-sm text-foreground/80 font-light">
                     {content}
                  </p>
                  {image && (
                     <div className="w-full bg-transparent h-60 mt-5 relative rounded-lg">
                        <Image
                           src={image}
                           alt="Image du post"
                           fill
                           sizes="100%"
                           className="rounded-lg object-cover"
                        />
                     </div>
                  )}

                  {/* Icons */}
                  <div className="mt-5 flex flex-col gap-3">
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
                     {!isComment && comments.length > 0 && (
                        <div className="ml-1 mt-3 flex items-center gap-2">
                           {comments.slice(0, 2).map((comment, index) => (
                              <Image
                                 key={uuidv4()}
                                 src={comment.author.profilePicture ?? ""}
                                 alt={`Photo de profil de ${comment.author.firstName} ${comment.author.lastName}`}
                                 width={24}
                                 height={24}
                                 className={`${
                                    index !== 0 && "-ml-5"
                                 } rounded-full object-cover border border-cyan-500`}
                              />
                           ))}
                           <Link href={`/social/post/${id}`}>
                              <p className="mt-1 text-sm font-medium text-foreground/70">
                                 {comments.length} réponse
                                 {comments.length > 1 && "s"}
                              </p>
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </article>
   );
};

export default PostCard;
