import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL("../" + path, import.meta.url);

async function readProjectFile(path) {
  return readFile(projectFile(path), "utf8");
}

test("exports one complete document with three editorial screens", async () => {
  const html = await readProjectFile("out/index.html");

  assert.match(html, /^<!DOCTYPE html>/i);
  assert.match(html, /<html\b[^>]*lang="ru"[^>]*>/i);
  assert.match(html, /<head\b[^>]*>[\s\S]*<title>[^<]+<\/title>[\s\S]*<\/head>/i);
  assert.match(html, /<body\b[^>]*>[\s\S]*<main\b[\s\S]*<\/main>[\s\S]*<\/body>/i);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<section\b/gi) ?? []).length, 3);
  assert.equal((html.match(/<footer\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<header\b/gi) ?? []).length, 3);
  assert.equal((html.match(/<nav\b/gi) ?? []).length, 1);
  assert.match(html, /id="about"/);
  assert.match(html, /id="program"/);
  assert.match(html, /id="trainers"/);
  assert.match(html, /id="registration"/);
});

test("keeps one registration outcome across the three screens", async () => {
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

test("uses only the supplied photographic set as one three-part narrative", async () => {
  const pageSource = await readProjectFile("app/page.tsx");
  const expectedPhotos = [
    "hero-time-trial.jpg",
    "program-cyclist.jpg",
    "week-swimmer.jpg",
    "coach-evgeny-finish.jpg",
    "evgeny.jpg",
    "coach-maksim-finish.jpg",
    "maksim-pool.jpg",
    "final-finish.jpg",
  ];
  const rejectedPhotos = [
    "hotline-ride.jpg",
    "hotline-team-ride.jpg",
    "hotline-finish-sochi.jpg",
  ];

  for (const photo of expectedPhotos) {
    assert.equal(
      (pageSource.match(new RegExp(photo.replace(".", "\\."), "g")) ?? []).length,
      1,
      photo,
    );
  }

  for (const photo of rejectedPhotos) {
    assert.doesNotMatch(pageSource, new RegExp(photo.replace(".", "\\.")), photo);
  }

  assert.equal((pageSource.match(/\balt="/g) ?? []).length, expectedPhotos.length);
  assert.match(pageSource, /alt="Евгений Тихонин проходит велосипедный этап/);
  assert.match(
    pageSource,
    /alt="Евгений Тихонин финиширует Ironman 70\.3 Durban под табло с результатом 03:56:27"/,
  );
  assert.match(pageSource, /alt="Максим Кубышко поправляет очки/);
  assert.match(pageSource, /alt="Максим Кубышко пересекает финишную ленту/);
  assert.match(pageSource, /Собрать гонку целиком/);
  assert.match(pageSource, /Знают финиш изнутри/);
});

test("loads honest Open-Meteo states without embedded observations", async () => {
  const [pageSource, conditionsSource, html] = await Promise.all([
    readProjectFile("app/page.tsx"),
    readProjectFile("app/conditions-panel.tsx"),
    readProjectFile("out/index.html"),
  ]);

  assert.match(pageSource, /<ConditionsPanel \/>/);
  assert.match(conditionsSource, /api\.open-meteo\.com\/v1\/forecast/);
  assert.match(conditionsSource, /marine-api\.open-meteo\.com\/v1\/marine/);
  assert.match(conditionsSource, /sea_surface_temperature/);
  assert.match(conditionsSource, /temperature_2m/);
  assert.match(conditionsSource, /sunrise%2Csunset/);
  assert.match(conditionsSource, /Загрузка/);
  assert.match(conditionsSource, /Нет данных/);
  assert.match(conditionsSource, /Сочи сейчас/);
  assert.match(conditionsSource, /Чёрное море/);
  assert.match(conditionsSource, /Рассвет \/ закат/);
  assert.match(conditionsSource, /Прогноз с&nbsp;17 сентября/);
  assert.match(conditionsSource, />Источник</);
  assert.match(conditionsSource, />Open-Meteo</);
  assert.match(conditionsSource, /sunrise \+ " \/ " \+ sunset/);
  assert.match(conditionsSource, /note: "у берега"/);
  assert.doesNotMatch(pageSource, /\+23°|\+28°|16 августа, 23:15/);
  assert.equal((html.match(/Загрузка/g) ?? []).length, 3);
});

test("locks the five-part weather rail to the approved MATERIAL / 01 token", async () => {
  const [html, css, conditionsSource] = await Promise.all([
    readProjectFile("out/index.html"),
    readProjectFile("app/globals.css"),
    readProjectFile("app/conditions-panel.tsx"),
  ]);

  assert.equal((html.match(/class="[^"]*\bmaterial-glass\b[^"]*"/g) ?? []).length, 5);
  assert.equal((html.match(/class="[^"]*\bservice-island\b[^"]*"/g) ?? []).length, 5);
  assert.match(conditionsSource, /condition-air/);
  assert.match(conditionsSource, /condition-sea/);
  assert.match(conditionsSource, /condition-daylight/);

  assert.match(css, /--material-glass-fill:\s*rgba\(13, 30, 20, 0\.3\);/);
  assert.match(css, /--material-glass-fill-hover:\s*rgba\(18, 38, 26, 0\.42\);/);
  assert.match(css, /--material-glass-stroke:\s*rgba\(244, 241, 232, 0\.08\);/);
  assert.match(css, /--material-glass-filter:\s*blur\(18px\) saturate\(0\.78\) brightness\(0\.9\);/);
  assert.match(css, /--service-island-height:\s*5\.125rem;/);
  assert.match(css, /--service-island-gap:\s*0\.25rem;/);
  assert.equal((css.match(/--material-glass-fill:/g) ?? []).length, 1);
  assert.equal((css.match(/--material-glass-fill-hover:/g) ?? []).length, 1);
  assert.match(
    css,
    /grid-template-columns:\s*1fr 1fr 1\.39fr 2\.02fr 1\.08fr;/,
  );
  assert.match(
    css,
    /\.material-glass\s*{[\s\S]*?border:\s*1px solid var\(--material-glass-stroke\);[\s\S]*?background:\s*var\(--material-glass-fill\);[\s\S]*?box-shadow:\s*var\(--material-glass-shadow\);[\s\S]*?backdrop-filter:\s*var\(--material-glass-filter\);[\s\S]*?}/,
  );
  assert.match(
    css,
    /\.service-island\s*{[\s\S]*?height:\s*var\(--service-island-height\);[\s\S]*?min-height:\s*var\(--service-island-height\);[\s\S]*?flex:\s*0 0 auto;/,
  );
  assert.doesNotMatch(css, /\.condition:nth-child|--glass-fill|--glass-blur/);
});

test("keeps the restrained fluid and accessible surface contract", async () => {
  const [css, themeToggleSource, pageSource] = await Promise.all([
    readProjectFile("app/globals.css"),
    readProjectFile("app/theme-toggle.tsx"),
    readProjectFile("app/page.tsx"),
  ]);

  assert.match(css, /--space-page:\s*clamp\(/);
  assert.match(css, /--space-section:\s*clamp\(/);
  assert.match(css, /--radius-control:/);
  assert.match(css, /--radius-card:/);
  assert.match(css, /--radius-panel:/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /text-wrap:\s*pretty/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /forced-colors:\s*active/);
  assert.match(
    css,
    /\.masthead\s*{[\s\S]*?position:\s*absolute;[\s\S]*?background:\s*transparent;/,
  );
  assert.doesNotMatch(css, /\.masthead\s*{[^}]*border-(?:top|right|bottom|left):/);
  assert.match(css, /\.section-nav a\s*{[\s\S]*?min-height:\s*3rem;/);
  assert.match(css, /\.theme-toggle\s*{[\s\S]*?min-height:\s*3rem;/);
  const mastheadSource = pageSource.match(
    /<header className="masthead">[\s\S]*?<\/header>/,
  )?.[0];
  assert.ok(mastheadSource);
  assert.doesNotMatch(mastheadSource, /<ThemeToggle\s*\/>/);
  assert.match(
    pageSource,
    /<footer className="site-footer">[\s\S]*?<ThemeToggle\s*\/>[\s\S]*?<\/footer>/,
  );
  assert.match(pageSource, /© 2026/);
  assert.match(pageSource, /Дизайн и&nbsp;разработка/);
  const mobileStart = css.indexOf("@media (max-width: 46rem)");
  const narrowStart = css.indexOf("@media (max-width: 23rem)", mobileStart);
  assert.notEqual(mobileStart, -1);
  assert.notEqual(narrowStart, -1);
  const mobileCss = css.slice(mobileStart, narrowStart);
  assert.match(
    mobileCss,
    /\.hero-stage\s*{[\s\S]*?grid-template-rows:\s*auto minmax\(0, 1fr\) auto;/,
  );
  assert.match(mobileCss, /\.hero-copy\s*{[\s\S]*?grid-row:\s*1;/);
  assert.match(mobileCss, /\.conditions\s*{[\s\S]*?grid-row:\s*3;/);
  assert.doesNotMatch(css, /999px|linear-gradient|clip-path/i);
  assert.equal((css.match(/corner-shape:\s*squircle/g) ?? []).length, 2);
  assert.match(themeToggleSource, /useSyncExternalStore/);
  assert.doesNotMatch(themeToggleSource, /requestAnimationFrame/);
});

test("keeps the standard Next static-export and GitHub Pages contract", async () => {
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
