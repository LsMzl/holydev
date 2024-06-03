/**
 * Fchier de configuration pour uploadThing.
 * @documentation https://docs.uploadthing.com/getting-started/appdir
 * @creation Créee le 02.06.24 - Louis Mazzella
 */

import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
   imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
      // Set permissions and file types for this FileRoute
      .middleware(async ({ req }) => {
         const { userId } = auth();

         //! Error
         if (!userId) {
            throw new UploadThingError("Unauthorized");
         }

         return { userId };
      })
      //* Success
      .onUploadComplete(async ({ metadata, file }) => {
         console.log("Upload complete for userId:", metadata.userId);
         console.log("file url", file.url);

         return { uploadedBy: metadata.userId };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;