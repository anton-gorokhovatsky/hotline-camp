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

function makeReadable(html) {
  return html
    .replaceAll("\u00a0", " ")
    .replaceAll("\u202f", " ")
    .replace(/&(?:nbsp|#160|#xa0);/gi, " ")
    .replace(/&#8239;|&#x202f;/gi, " ")
    .replace(/<!--\s*-->/g, "")
    .replace(/\s+/g, " ");
}

test("renders the complete Hotline camp landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const readableHtml = makeReadable(html);

  assert.match(html, /<html[^>]*lang="ru"/i);
  assert.match(html, /<title>[^<]*Hotline[^<]*триатлонный кэмп/i);
  assert.match(readableHtml, /27 сентября/);
  assert.match(readableHtml, /4 октября/);
  assert.match(readableHtml, /Форма уже набрана/);
  assert.match(readableHtml, /Собираем старт/);
  assert.match(readableHtml, /Дальше — вместе/);
  assert.match(readableHtml, /исторический ориентир/i);
  assert.match(readableHtml, /до 15 человек/i);
  assert.match(readableHtml, /30 000 ₽/i);
  assert.match(readableHtml, /Перейти к содержанию/);

  assert.match(html, /<header\b/i);
  assert.match(html, /<nav\b/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<section\b/i);
  assert.match(html, /<footer\b/i);
  assert.match(html, /<details\b/i);

  const ctaAnchors =
    html.match(
      /<a\b[^>]*href="https:\/\/t\.me\/DDopenChat"[^>]*>[\s\S]*?Обсудить участие[\s\S]*?<\/a>/g,
    ) ?? [];
  assert.equal(ctaAnchors.length, 4);

  const narrativeImages = [
    "hero-time-trial.jpg",
    "program-cyclist.jpg",
    "week-swimmer.jpg",
    "coach-evgeny-finish.jpg",
    "coach-maksim-finish.jpg",
    "final-finish.jpg",
  ];

  for (const image of narrativeImages) {
    const escapedImage = image.replace(".", "\\.");
    const renderedImages = html.match(
      new RegExp(`<img\\b[^>]*\\bsrc="[^"]*${escapedImage}"[^>]*>`, "g"),
    );
    assert.equal(renderedImages?.length ?? 0, 1);
  }

  assert.match(html, /Триатлет проходит велосипедный этап в аэропозиции/);
  assert.match(html, /Велосипедист Hotline проходит трассу на скорости/);
  assert.match(html, /Триатлет выходит из воды после плавательного этапа/);
  assert.match(html, /Евгений Тихонин держит финишную ленту после триатлона/);
  assert.match(html, /Максим Кубышко бежит по финишному коридору/);
  assert.match(html, /Триатлет пересекает финишную ленту/);
  assert.match(readableHtml, /4-кратный чемпион России/);
  assert.match(readableHtml, /Мастер спорта по современному пятиборью/);

  assert.match(html, /ironstar-113-sirius-2026\/program/);
  assert.match(html, /ironstar-olympic-sirius-2026\/program/);
  assert.match(html, /sirius\.gov\.ru\/transport/);
  assert.match(html, /temperaturavody\.com/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/i);
});

test("keeps one CTA component and the project interface contract", async () => {
  const [layout, page, css] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /prefers-color-scheme/);
  assert.match(layout, /localStorage\.getItem\('camp-theme'\)/);
  assert.match(page, /function CampCta\(\)/);
  assert.equal((page.match(/Обсудить участие/g) ?? []).length, 1);
  assert.equal((page.match(/https:\/\/t\.me\/DDopenChat/g) ?? []).length, 1);
  assert.equal((page.match(/<CampCta \/>/g) ?? []).length, 4);

  assert.doesNotMatch(page, /energy-ribbon|SportMark|route-map|footer-wordmark/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|conic-gradient/);
  assert.doesNotMatch(page, /hotline-ride\.jpg/);

  assert.match(css, /--gutter:\s*clamp\(/);
  assert.match(css, /--space-section:\s*clamp\(/);
  assert.match(css, /--radius-control:/);
  assert.match(css, /--radius-card:/);
  assert.match(css, /--radius-panel:/);

  const radiusValues = [...css.matchAll(/border-radius:\s*([^;]+);/g)].map((match) =>
    match[1].trim(),
  );
  assert.ok(radiusValues.length > 0);
  assert.ok(radiusValues.every((value) => /^var\(--radius-(?:control|card|panel)\)$/.test(value)));

  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /forced-colors:\s*active/);
  assert.match(css, /min-height:\s*3rem/);
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
});
