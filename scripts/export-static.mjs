import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const out = new URL("../out/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", Date.now().toString());

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(client, out, { recursive: true });
await cp(publicDir, out, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  // Render the application route at `/`. Vite's Pages base still prefixes every
  // emitted asset with `/hotline-camp/`; requesting the public base here would
  // make the runtime canonicalize that path before the static file exists.
  new Request("https://anton-gorokhovatsky.github.io/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed: ${response.status} ${response.statusText}`);
}

const html = await response.text();
await writeFile(new URL("index.html", out), html);
await writeFile(new URL("404.html", out), html);
await writeFile(new URL(".nojekyll", out), "");

console.log(`Exported ${new URL("index.html", out).pathname}`);
