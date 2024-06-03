/**
 * Route permettant d'envoyer les fichier sur uploadThing.
 * @documentation https://docs.uploadthing.com/getting-started/appdir
 * @creation Créee le 02.06.24 - Louis Mazzella
 */

import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});