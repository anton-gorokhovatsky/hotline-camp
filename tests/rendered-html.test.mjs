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
  const [pageSource, mobileMenuSource, ctaSource, html] = await Promise.all([
    readProjectFile("app/page.tsx"),
    readProjectFile("app/mobile-menu.tsx"),
    readProjectFile("app/camp-cta.tsx"),
    readProjectFile("out/index.html"),
  ]);

  assert.equal((ctaSource.match(/const TELEGRAM_URL/g) ?? []).length, 1);
  assert.equal((ctaSource.match(/https:\/\/t\.me\/DDopenChat/g) ?? []).length, 1);
  assert.equal((ctaSource.match(/function CampCta/g) ?? []).length, 1);
  assert.equal((pageSource.match(/<CampCta\b/g) ?? []).length, 2);
  assert.equal((mobileMenuSource.match(/<CampCta\b/g) ?? []).length, 1);
  assert.equal((ctaSource.match(/Обсудить участие/g) ?? []).length, 1);
  assert.match(mobileMenuSource, /27 сентября — 4 октября/);

  const renderedCtas = html.match(
    /<a\b[^>]*href="https:\/\/t\.me\/DDopenChat"[^>]*>[\s\S]*?Обсудить участие[\s\S]*?<\/a>/g,
  ) ?? [];
  assert.equal(renderedCtas.length, 2);
});

test("places the concrete camp promise on the first screen exactly once", async () => {
  const pageSource = await readProjectFile("app/page.tsx");
  const promiseStart = "Заранее проедем велотрассу";
  const heroCopy = pageSource.match(
    /<div className="hero-copy">[\s\S]*?<\/div>/,
  )?.[0];
  const programPractical = pageSource.match(
    /<div className="program-practical">[\s\S]*?<\/div>\s*<ol/,
  )?.[0];

  assert.equal((pageSource.match(new RegExp(promiseStart, "g")) ?? []).length, 1);
  assert.ok(heroCopy);
  assert.match(heroCopy, /className="hero-lead"/);
  assert.match(heroCopy, /Отработаем навигацию/);
  assert.match(heroCopy, /транзитные зоны/);
  assert.match(heroCopy, /питание на&nbsp;дистанции/);
  assert.ok(programPractical);
  assert.doesNotMatch(programPractical, /program-lead|Заранее проедем/);
});

test("uses only the supplied photographic set as one three-part narrative", async () => {
  const pageSource = await readProjectFile("app/page.tsx");
  const expectedPhotos = [
    "hero-time-trial.jpg",
    "coach-evgeny-finish.jpg",
    "week-swimmer.jpg",
    "coach-maksim-finish.jpg",
    "maksim-pool.jpg",
    "final-finish.jpg",
  ];
  const rejectedPhotos = [
    "hotline-ride.jpg",
    "hotline-team-ride.jpg",
    "hotline-finish-sochi.jpg",
    "program-cyclist.jpg",
    "evgeny.jpg",
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
  assert.match(pageSource, /alt="Евгений Тихонин выходит из воды/);
  assert.match(pageSource, /alt="Максим Кубышко поправляет очки/);
  assert.match(pageSource, /alt="Максим Кубышко пересекает финишную ленту/);
  assert.match(pageSource, /Собрать гонку целиком/);
  assert.match(pageSource, /Сами выходят на&nbsp;старт/);
  assert.match(pageSource, /которые понадобятся[\s\S]*в&nbsp;день гонки/);
  assert.doesNotMatch(pageSource, /program-photo-pair|program-shot/);
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
  const [css, themeToggleSource, mobileMenuSource, pageSource] = await Promise.all([
    readProjectFile("app/globals.css"),
    readProjectFile("app/theme-toggle.tsx"),
    readProjectFile("app/mobile-menu.tsx"),
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
  assert.match(mastheadSource, /<ThemeToggle variant="icon" \/>/);
  assert.match(mastheadSource, /<MobileMenu \/>/);
  const footerSource = pageSource.match(
    /<footer className="site-footer">[\s\S]*?<\/footer>/,
  )?.[0];
  assert.ok(footerSource);
  assert.match(footerSource, /© 2026/);
  assert.match(footerSource, /Дизайн и&nbsp;разработка/);
  assert.doesNotMatch(footerSource, /ThemeToggle|footer-top|Наверх/);
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
  assert.match(mobileCss, /\.mobile-menu\s*{[\s\S]*?display:\s*block;/);
  assert.match(mobileCss, /\.menu-toggle\s*{[\s\S]*?width:\s*3rem;[\s\S]*?height:\s*3rem;/);
  assert.match(mobileCss, /\.mobile-menu-panel\s*{[\s\S]*?position:\s*fixed;/);
  assert.match(
    mobileCss,
    /\.conditions-row\s*{[\s\S]*?width:\s*max-content;[\s\S]*?padding-right:\s*var\(--space-page\);/,
  );
  assert.match(
    mobileCss,
    /\.condition-forecast\s*{[\s\S]*?width:\s*14rem;[\s\S]*?min-width:\s*14rem;/,
  );
  assert.match(
    mobileCss,
    /\.footer-meta\s*{[\s\S]*?grid-template-columns:\s*auto 1fr;[\s\S]*?gap:\s*1rem;/,
  );
  assert.match(
    mobileCss,
    /\.coach-context\s*{[\s\S]*?grid-column:\s*1;[\s\S]*?width:\s*100%;[\s\S]*?justify-self:\s*stretch;/,
  );
  assert.doesNotMatch(css, /999px|linear-gradient|clip-path/i);
  assert.equal((css.match(/corner-shape:\s*squircle/g) ?? []).length, 2);
  assert.match(
    css,
    /\.hero-stage::before\s*{[\s\S]*?inset:\s*0;[\s\S]*?width:\s*100%;[\s\S]*?mask-image:\s*radial-gradient/,
  );
  assert.doesNotMatch(css, /--conditions-inset/);
  assert.match(css, /\.masthead\s*{[\s\S]*?var\(--space-page\);/);
  assert.match(css, /\.hero-copy\s*{[\s\S]*?margin-left:\s*var\(--space-page\);/);
  assert.match(
    css,
    /\.conditions\s*{[\s\S]*?width:\s*calc\(100% - \(2 \* var\(--space-page\)\)\);[\s\S]*?margin:\s*auto var\(--space-page\) 0;/,
  );
  assert.match(css, /\.hero-media img\s*{[\s\S]*?width:\s*127%;/);
  assert.doesNotMatch(css, /width:\s*min\(64rem, 68vw\)|width:\s*min\(42rem, 67vw\)/);
  assert.match(css, /--material-accent-fill:\s*rgba\(120, 15, 40, 0\.7\);/);
  assert.match(css, /--material-accent-filter:\s*blur\(18px\) saturate\(0\.78\) brightness\(0\.9\);/);
  assert.match(
    css,
    /\.site-footer\s*{[\s\S]*?width:\s*100%;[\s\S]*?margin:\s*-3\.75rem 0 0;[\s\S]*?border-radius:\s*0;[\s\S]*?background:\s*var\(--material-accent-fill\);[\s\S]*?backdrop-filter:\s*var\(--material-accent-filter\);/,
  );
  assert.match(css, /\.footer-meta\s*{[\s\S]*?grid-template-columns:\s*1fr auto 1fr;/);
  assert.match(themeToggleSource, /useSyncExternalStore/);
  assert.match(themeToggleSource, /type ThemeToggleVariant = "text" \| "icon" \| "menu"/);
  assert.match(themeToggleSource, /aria-pressed={theme === "dark"}/);
  assert.doesNotMatch(themeToggleSource, /requestAnimationFrame/);
  assert.match(mobileMenuSource, /aria-expanded={isOpen}/);
  assert.match(mobileMenuSource, /event\.key !== "Escape"/);
  assert.match(mobileMenuSource, /event\.key !== "Tab"/);
  assert.match(mobileMenuSource, /querySelectorAll<HTMLElement>/);
  assert.match(mobileMenuSource, /document\.activeElement === lastItem/);
  assert.match(mobileMenuSource, /classList\.add\("menu-open"\)/);
  assert.match(mobileMenuSource, /classList\.remove\("menu-open"\)/);
  assert.match(mobileMenuSource, /body\.style\.position = "fixed"/);
  assert.match(mobileMenuSource, /window\.scrollTo\(0, scrollPosition\)/);
  assert.match(mobileMenuSource, /event\.preventDefault\(\)/);
  assert.match(mobileMenuSource, /window\.history\.pushState\(null, "", href\)/);
  assert.match(mobileMenuSource, /<ThemeToggle variant="menu" \/>/);
  assert.equal((mobileMenuSource.match(/href: "#(?:program|trainers|registration)"/g) ?? []).length, 3);
  assert.match(css, /html\.menu-open[\s\S]*?overflow:\s*hidden;/);
  assert.match(
    mobileCss,
    /html\.menu-open \.masthead\s*{[\s\S]*?position:\s*fixed;/,
  );
  assert.match(mobileCss, /html\.menu-open \.hero\s*{[\s\S]*?z-index:\s*10;/);
  assert.match(
    mobileCss,
    /\.mobile-menu-panel\s*{[\s\S]*?inset:\s*0;[\s\S]*?min-height:\s*100dvh;[\s\S]*?overflow-y:\s*auto;/,
  );
  assert.match(
    css,
    /\.coach-images\s*{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*minmax\(0, 2\.15fr\) minmax\(11rem, 1fr\);/,
  );
  assert.match(
    css,
    /\.coach-story-maksim \.coach-images\s*{[\s\S]*?grid-template-columns:\s*minmax\(11rem, 1fr\) minmax\(0, 2\.15fr\);/,
  );
  assert.match(css, /\.coach-context\s*{[\s\S]*?position:\s*static;/);
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
