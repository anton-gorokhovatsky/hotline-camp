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
  assert.equal((html.match(/<header\b/gi) ?? []).length, 2);
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
  assert.match(pageSource, /alt="Евгений Тихонин держит финишную ленту/);
  assert.match(pageSource, /alt="Максим Кубышко пересекает финишную ленту/);

  assert.match(pageSource, /const sochiConditions/);
  assert.equal(
    (pageSource.match(/className="condition service-island material-glass"/g) ?? []).length,
    1,
  );
  assert.match(pageSource, /Сочи сейчас/);
  assert.match(pageSource, /Чёрное море/);
  assert.match(pageSource, /Рассвет \/ закат/);
  assert.doesNotMatch(pageSource, /Прогноз с\\u00a017 сентября/);
  assert.match(pageSource, /Погода: Open-Meteo · обновлено 16 августа, 23:15/);
  assert.doesNotMatch(
    `${pageSource}\n${layoutSource}`,
    /27\.09—04\.10(?:\.2026|\s*[·,]\s*2026)/,
  );
  assert.doesNotMatch(css, /999px|linear-gradient|clip-path/i);
  assert.match(themeToggleSource, /useSyncExternalStore/);
  assert.doesNotMatch(themeToggleSource, /requestAnimationFrame/);
});

test("locks the service rail to MATERIAL / 01 and content-sized tiles", async () => {
  const [html, css] = await Promise.all([
    readProjectFile("out/index.html"),
    readProjectFile("app/globals.css"),
  ]);

  assert.equal((html.match(/class="[^"]*\bmaterial-glass\b[^"]*"/g) ?? []).length, 3);
  assert.equal((html.match(/class="[^"]*\bglass-cluster\b[^"]*"/g) ?? []).length, 0);
  assert.equal((html.match(/class="[^"]*\bservice-island\b[^"]*"/g) ?? []).length, 3);

  assert.match(css, /--material-glass-fill:/);
  assert.match(css, /--material-glass-stroke:/);
  assert.match(css, /--material-glass-filter:/);
  assert.match(css, /--material-glass-shadow:/);
  assert.match(css, /--service-island-height:\s*4\.5rem;/);
  assert.match(css, /--service-island-gap:\s*0\.7rem;/);
  assert.match(
    css,
    /\.material-glass\s*{[\s\S]*?background:\s*var\(--material-glass-fill\);[\s\S]*?backdrop-filter:\s*var\(--material-glass-filter\);[\s\S]*?}/,
  );
  assert.match(
    css,
    /\.conditions\s*{[\s\S]*?display:\s*flex;[\s\S]*?max-width:\s*calc\(100% - \(2 \* var\(--space-page\)\)\);/,
  );
  assert.match(css, /\.condition\s*{[\s\S]*?width:\s*max-content;[\s\S]*?flex:\s*0 0 auto;/);
  assert.match(
    css,
    /\.service-island\s*{[\s\S]*?height:\s*var\(--service-island-height\);[\s\S]*?min-height:\s*var\(--service-island-height\);/,
  );
  assert.doesNotMatch(css, /glass-cluster|cluster-neck|cluster-gap/);
  assert.doesNotMatch(css, /\.condition:nth-child/);
  assert.doesNotMatch(css, /--glass-fill|--glass-blur/);
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
