import { SHA1 } from "bun";
import { Elysia, status, t } from "elysia";

if (!process.env.DOMAIN || !process.env.SECRET_KEY || !process.env.PORT) throw new Error("Missing required environment variables.");

let STORAGE: ArrayBuffer | null = null;
const server = new Elysia();

server.get("/download", async () => {
  if (!STORAGE) return status(404, "Not Found");
  return new Response(STORAGE, { headers: { "Content-Type": "application/zip" } });
});

server.post(
  "/upload",
  async ({ body }) => {
    if (body.id !== process.env.SECRET_KEY) return status(403, "Forbidden");
    STORAGE = await body.pack.arrayBuffer();
    return { url: `https://${process.env.DOMAIN}/download`, sha1: new SHA1().update(STORAGE).digest("hex") };
  },
  { body: t.Object({ id: t.String(), pack: t.File() }) },
);

try {
  server.listen(Number(process.env.PORT));
  console.log(`Server started at ${server.server?.url}`);
} catch (error) {
  console.log("Failed to start server:");
  console.log(error);
}
