import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Hotline camp landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const readableHtml = html
    .replaceAll("\u00a0", " ")
    .replaceAll("\u202f", " ")
    .replace(/&(?:nbsp|#160|#xa0);/gi, " ")
    .replace(/&#8239;|&#x202f;/gi, " ");
  assert.match(html, /<html[^>]*lang="ru"/i);
  assert.match(html, /<title>[^<]*Hotline[^<]*триатлонный кэмп/i);
  assert.match(readableHtml, /27 сентября/);
  assert.match(readableHtml, /4 октября/);
  assert.match(readableHtml, /Кэмп Hotline/);
  assert.match(readableHtml, /Собрать форму/);
  assert.match(readableHtml, /исторический ориентир/i);
  assert.match(html, /https:\/\/t\.me\/DDopenChat/);
  assert.match(readableHtml, /Перейти к содержанию/);
  assert.match(html, /в(?:\u00a0|&nbsp;|&#x?0*a0;)Сочи/i);
  assert.match(html, /30(?:\u202f|&#8239;|&#x202f;)000(?:\u00a0|&nbsp;|&#x?0*a0;)₽/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/i);
});

test("keeps theme, motion and focus affordances in the production source", async () => {
  const [layout, page, css] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /prefers-color-scheme/);
  assert.match(layout, /localStorage\.getItem\('camp-theme'\)/);
  assert.match(page, /className="energy-ribbon"/);
  assert.match(page, /Hotline \/ триатлонный кэмп/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /forced-colors:\s*active/);
  assert.match(css, /min-height:\s*(?:44px|2\.75rem)/);
  assert.doesNotMatch(page, /H×D|SkeletonPreview/);
});
