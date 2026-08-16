import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

async function readProjectFile(path) {
  return readFile(projectFile(path), "utf8");
}

test("exports a complete static document", async () => {
  const html = await readProjectFile("out/index.html");

  assert.match(html, /^<!DOCTYPE html>/i);
  assert.match(html, /<html\b[^>]*>/i);
  assert.match(html, /<head\b[^>]*>[\s\S]*<title>[^<]+<\/title>[\s\S]*<\/head>/i);
  assert.match(html, /<body\b[^>]*>[\s\S]*<main\b[\s\S]*<\/main>[\s\S]*<\/body>/i);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<section\b/gi) ?? []).length, 2);
  assert.equal((html.match(/<footer\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<header\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<nav\b/gi) ?? []).length, 1);
});

test("keeps one registration outcome across both concept screens", async () => {
  const [pageSource, html] = await Promise.all([
    readProjectFile("app/page.tsx"),
    readProjectFile("out/index.html"),
  ]);

  assert.equal((pageSource.match(/const TELEGRAM_URL/g) ?? []).length, 1);
  assert.equal((pageSource.match(/https:\/\/t\.me\/DDopenChat/g) ?? []).length, 1);
  assert.equal((pageSource.match(/function CampCta/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<CampCta\b/g) ?? []).length, 2);
  assert.equal((pageSource.match(/Обсудить участие/g) ?? []).length, 1);

  const renderedCtas = html.match(
    /<a\b[^>]*href="https:\/\/t\.me\/DDopenChat"[^>]*>[\s\S]*?Обсудить участие[\s\S]*?<\/a>/g,
  ) ?? [];
  assert.equal(renderedCtas.length, 2);
});

test("contains the current hero, trainers and final scene", async () => {
  const [pageSource, layoutSource, themeToggleSource, css] = await Promise.all([
    readProjectFile("app/page.tsx"),
    readProjectFile("app/layout.tsx"),
    readProjectFile("app/theme-toggle.tsx"),
    readProjectFile("app/globals.css"),
  ]);

  assert.match(pageSource, /hero-time-trial\.jpg/);
  assert.match(pageSource, /coach-evgeny-finish\.jpg/);
  assert.match(pageSource, /final-finish\.jpg/);
  assert.match(pageSource, /alt="Триатлет проходит велосипедный этап/);
  assert.match(pageSource, /alt="Евгений Тихонин поднимает финишную ленту/);
  assert.match(pageSource, /alt="Максим Кубышко пересекает финишную ленту/);

  assert.match(pageSource, /const sochiConditions/);
  assert.equal((pageSource.match(/className="condition/g) ?? []).length, 1);
  assert.match(pageSource, /Прогноз с\\u00a017 сентября/);
  assert.match(pageSource, /погода: Open-Meteo, 16\.08 · 23:15/);
  assert.doesNotMatch(`${pageSource}\n${layoutSource}`, /2026/);
  assert.doesNotMatch(css, /999px|linear-gradient|clip-path/i);
  assert.match(themeToggleSource, /useSyncExternalStore/);
  assert.doesNotMatch(themeToggleSource, /requestAnimationFrame/);
});

test("keeps the standard Next static-export contract", async () => {
  const [packageSource, config, workflow] = await Promise.all([
    readProjectFile("package.json"),
    readProjectFile("next.config.ts"),
    readProjectFile(".github/workflows/pages.yml"),
  ]);
  const packageJson = JSON.parse(packageSource);

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts["build:pages"], "GITHUB_PAGES=true next build");
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    "next",
    "react",
    "react-dom",
  ]);

  assert.match(config, /output:\s*"export"/);
  assert.match(config, /basePath/);
  assert.match(config, /images:\s*{\s*unoptimized:\s*true,?\s*}/);

  assert.match(workflow, /pnpm build:pages/);
  assert.match(workflow, /path:\s*(?:\.\/)?out/);
});
