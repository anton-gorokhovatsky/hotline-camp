#!/usr/bin/env python3
"""Dependency-free contract checks for the static Hotline Camp site."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
HTML_PATH = PUBLIC / "index.html"
CSS_PATH = PUBLIC / "styles.css"
JS_PATH = PUBLIC / "app.js"
CTA_URL = "https://forms.gle/uhrh9pppLXSnwSN56"
METRIKA_COUNTER_ID = "111830664"
METRIKA_PIXEL_URL = f"https://mc.yandex.ru/watch/{METRIKA_COUNTER_ID}"


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: list[tuple[str, dict[str, str]]] = []
        self.links: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.sections: list[dict[str, str]] = []
        self._anchor_stack: list[list[str]] = []
        self.anchor_texts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        self.tags.append((tag, values))
        if tag == "a":
            self.links.append(values)
            self._anchor_stack.append([])
        if tag == "img":
            self.images.append(values)
        if tag == "section":
            self.sections.append(values)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self._anchor_stack:
            text = " ".join("".join(self._anchor_stack.pop()).split())
            self.anchor_texts.append(text)

    def handle_data(self, data: str) -> None:
        if self._anchor_stack:
            self._anchor_stack[-1].append(data)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def read(path: Path) -> str:
    require(path.is_file(), f"missing file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def classes(attrs: dict[str, str]) -> set[str]:
    return set(attrs.get("class", "").split())


def main() -> int:
    html = read(HTML_PATH)
    css = read(CSS_PATH)
    js = read(JS_PATH)
    workflow = read(ROOT / ".github/workflows/pages.yml")

    parser = DocumentParser()
    parser.feed(html)

    require(html.lower().startswith("<!doctype html>"), "document must start with a doctype")
    require(re.search(r'<html\b[^>]*\blang="ru"', html, re.I) is not None, "html lang must be ru")
    require(sum(tag == "main" for tag, _ in parser.tags) == 1, "exactly one main is required")
    require(sum(tag == "footer" for tag, _ in parser.tags) == 1, "exactly one footer is required")
    require(len(parser.sections) == 4, "hero, program, trainers and registration must be separate sections")
    require(
        [section.get("id") for section in parser.sections]
        == ["about", "program", "trainers", "registration"],
        "editorial sections must keep their semantic order",
    )
    require(
        html.index('</section>\n\n      <section class="closing-scene') > html.index('id="trainers"'),
        "registration must be outside the trainers section",
    )

    cta_indexes = [
        index for index, link in enumerate(parser.links)
        if "camp-cta" in classes(link)
    ]
    require(len(cta_indexes) == 4, "hero, menu, program and closing must expose the same CTA")
    for index in cta_indexes:
        require(parser.links[index].get("href") == CTA_URL, "every CTA must use the approved form URL")
        require(parser.anchor_texts[index].startswith("Заполнить заявку"), "every CTA must use the approved text")

    selected_photos = {
        "hero-time-trial.jpg",
        "coach-evgeny-finish.jpg",
        "week-swimmer.jpg",
        "coach-evgeny-bike.jpg",
        "coach-maksim-finish.jpg",
        "maksim-pool.jpg",
        "coach-maksim-water.jpg",
        "final-finish.jpg",
    }
    tracking_pixels = [image for image in parser.images if image.get("src") == METRIKA_PIXEL_URL]
    narrative_images = [image for image in parser.images if image.get("src") != METRIKA_PIXEL_URL]
    require(len(tracking_pixels) == 1, "Yandex Metrika needs one noscript tracking pixel")
    image_names = {Path(urlparse(image.get("src", "")).path).name for image in narrative_images}
    require(image_names == selected_photos, "only the eight approved narrative photographs may be rendered")
    require(all(image.get("alt", "").strip() for image in narrative_images), "every rendered photograph needs alt text")
    for image in narrative_images:
        source = image.get("src", "")
        require((PUBLIC / source.removeprefix("./")).is_file(), f"missing image asset: {source}")

    require(
        f"https://mc.yandex.ru/metrika/tag.js?id={METRIKA_COUNTER_ID}" in html,
        "Yandex Metrika loader must use the approved counter",
    )
    require(f'ym({METRIKA_COUNTER_ID},"init"' in html, "Yandex Metrika counter must be initialized")

    require("Четырёхкратный чемпион России" in html, "the trainer credential must use natural Russian wording")
    require("4-кратный" not in html, "the technical numeral wording must be removed")
    require('<span class="hero-title-main">Финальная неделя перед стартами</span>' in html, "the hero heading must keep its primary line")
    require(html.count("IRONSTAR 2026") >= 2, "the event name must align across the hero and metadata")
    require(html.count("Переводим накопленную форму в&nbsp;готовность к&nbsp;старту.") == 1, "the hero promise must appear exactly once")
    require("Абсолютный победитель Ironman 70.3 Oman 2025" in html, "the supplied trainer distinction must be preserved")
    require("Победитель VII Всероссийской летней спартакиады учащихся, 2015" in html, "the supplied Spartakiad title must be preserved")
    require("Встретимся в&nbsp;Сочи?" in html, "the registration section needs its own heading")

    for endpoint in ("api.open-meteo.com/v1/forecast", "marine-api.open-meteo.com/v1/marine"):
        require(endpoint in js, f"missing live data endpoint: {endpoint}")
    for state in ("Загрузка", "Нет данных", "данные недоступны"):
        require(state in html + js, f"missing honest data state: {state}")
    require("sea_surface_temperature" in js, "sea temperature must come from Open-Meteo")
    require("temperature_2m" in js, "air temperature must come from Open-Meteo")

    for token in (
        "--space-page: clamp(",
        "--space-section: clamp(",
        "--radius-control:",
        "--radius-card:",
        "--radius-panel:",
        "--material-glass-fill:",
        "--material-accent-fill:",
    ):
        require(token in css, f"missing design token: {token}")
    for feature in ("prefers-reduced-motion: reduce", "forced-colors: active", "text-wrap: balance", "text-wrap: pretty"):
        require(feature in css, f"missing resilient CSS feature: {feature}")
    require(".masthead.is-scrolled" in css, "the mobile masthead must gain a readable fixed state")
    require("position: fixed" in css[css.index("@media (max-width: 46rem)"):], "the mobile masthead/menu must be fixed")
    require(css.count("{") == css.count("}"), "CSS braces are unbalanced")
    require(not re.search(r"999px|clip-path", css, re.I), "forbidden decorative geometry found")

    require("pnpm" not in workflow and "next build" not in workflow, "Pages must not depend on Node or Next")
    require(re.search(r"path:\s*(?:\./)?public", workflow) is not None, "Pages must upload the public directory")

    print("Static contract: OK")
    print(f"Sections: {len(parser.sections)}; CTAs: {len(cta_indexes)}; photographs: {len(narrative_images)}")
    print("Runtime: plain HTML/CSS/JS; no Node build required")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as error:
        print(f"Static contract: FAIL — {error}", file=sys.stderr)
        raise SystemExit(1)
