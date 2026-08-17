import { Elysia, status, t } from "elysia";
import { mkdir } from "fs/promises";
import { join } from "path";

if (!process.env.DOMAIN || !process.env.SECRET_KEY || !process.env.PORT) throw new Error("Missing required environment variables.");

const packsFolder = join(process.cwd(), "cache");
await mkdir(packsFolder, { recursive: true });

const server = new Elysia();

server.get(
  "/download",
  async ({ query: { server } }) => {
    if (!/^[0-9-]+$/.test(server)) return status(404, "Not Found");
    const file = Bun.file(join(packsFolder, server));
    if (!(await file.exists())) return status(404, "Not Found");

    return new Response(file.stream(), { headers: { "Content-Type": "application/zip" } });
  },
  { query: t.Object({ server: t.String() }) },
);

server.post(
  "/upload",
  async ({ body }) => {
    if (!body.id.startsWith(process.env.SECRET_KEY!)) return status(403, "Forbidden");
    let server = body.id.replace(process.env.SECRET_KEY!, "");
    if (!server) return status(403, "Forbidden");
    server = Bun.hash(server).toString();

    const hasher = new Bun.CryptoHasher("sha1");
    const writer = Bun.file(join(packsFolder, server)).writer();
    const reader = body.pack.stream().getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      hasher.update(value);
      writer.write(value);
    }

    await writer.end();
    return { url: `https://${process.env.DOMAIN}/download?server=${server}`, sha1: hasher.digest("hex") };
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
