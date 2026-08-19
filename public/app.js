(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggles = [...document.querySelectorAll("[data-theme-toggle]")];
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "camp-theme";

  const storedTheme = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (_) {
      return null;
    }
  };

  const currentTheme = () => {
    const applied = root.dataset.theme;
    return applied === "light" || applied === "dark"
      ? applied
      : storedTheme() || (systemTheme.matches ? "dark" : "light");
  };

  const updateThemeControls = (theme) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const statusLabel = theme === "dark" ? "Дневная версия" : "Ночная версия";
    const accessibleLabel = `Включить ${nextTheme === "dark" ? "тёмную" : "светлую"} тему`;

    themeToggles.forEach((toggle) => {
      toggle.setAttribute("aria-label", accessibleLabel);
      toggle.setAttribute("aria-pressed", String(theme === "dark"));

      if (toggle.classList.contains("theme-toggle--icon")) {
        toggle.title = statusLabel;
      }

      const label = toggle.querySelector(".theme-toggle-label");
      if (label) label.textContent = statusLabel;

      const moon = toggle.querySelector(".theme-toggle-icon--moon");
      const sun = toggle.querySelector(".theme-toggle-icon--sun");
      if (moon) moon.hidden = nextTheme !== "dark";
      if (sun) sun.hidden = nextTheme !== "light";
    });
  };

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (_) {}
    }

    updateThemeControls(theme);
  };

  applyTheme(currentTheme());

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  });

  systemTheme.addEventListener("change", (event) => {
    if (!storedTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      applyTheme(storedTheme() || (systemTheme.matches ? "dark" : "light"));
    }
  });
})();

(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const masthead = document.querySelector("#masthead");
  const toggle = document.querySelector("#menu-toggle");
  const panel = document.querySelector("#mobile-menu-panel");
  const sectionLinks = [...document.querySelectorAll('.section-nav a[href^="#"], .mobile-menu-links a[href^="#"]')];
  const sections = [...document.querySelectorAll("#program, #trainers, #registration")];

  if (!(masthead instanceof HTMLElement)
    || !(toggle instanceof HTMLButtonElement)
    || !(panel instanceof HTMLElement)) {
    return;
  }

  const openIcon = toggle.querySelector(".menu-icon-open");
  const closeIcon = toggle.querySelector(".menu-icon-close");
  let savedScroll = 0;
  let previousBodyStyles = null;

  const updateStickyState = () => {
    masthead.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const updateActiveSection = () => {
    if (root.classList.contains("menu-open")) return;

    const marker = window.scrollY + Math.min(window.innerHeight * 0.28, 240);
    let activeId = "";

    sections.forEach((section) => {
      if (section instanceof HTMLElement && section.offsetTop <= marker) {
        activeId = section.id;
      }
    });

    sectionLinks.forEach((link) => {
      const isCurrent = activeId && link.getAttribute("href") === `#${activeId}`;
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const focusableItems = () => [
    toggle,
    ...panel.querySelectorAll("a[href], button:not([disabled])"),
  ].filter((item) => item instanceof HTMLElement && !item.hidden);

  const closeMenu = ({ restoreFocus = true, destination = null } = {}) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;

    const previousScrollBehavior = root.style.scrollBehavior;
    const destinationTop = destination instanceof HTMLElement ? destination.offsetTop : null;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    root.classList.remove("menu-open");
    panel.hidden = true;
    if (openIcon instanceof SVGElement) openIcon.hidden = false;
    if (closeIcon instanceof SVGElement) closeIcon.hidden = true;

    if (previousBodyStyles) {
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
    }

    root.style.scrollBehavior = "auto";
    window.scrollTo(0, savedScroll);
    if (destinationTop !== null) {
      window.history.pushState(null, "", `#${destination.id}`);
      window.requestAnimationFrame(() => {
        window.scrollTo(0, destinationTop);
        window.requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior;
          updateStickyState();
          updateActiveSection();
        });
      });
    } else {
      root.style.scrollBehavior = previousScrollBehavior;
      updateStickyState();
      updateActiveSection();
    }
    if (restoreFocus) toggle.focus();
  };

  const openMenu = () => {
    if (toggle.getAttribute("aria-expanded") === "true") return;

    savedScroll = window.scrollY;
    previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    panel.hidden = false;
    updateActiveSection();
    root.classList.add("menu-open");
    if (openIcon instanceof SVGElement) openIcon.hidden = true;
    if (closeIcon instanceof SVGElement) closeIcon.hidden = false;

    body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
    else openMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;
    const items = focusableItems();
    const first = items[0];
    const last = items.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  panel.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const selector = link.getAttribute("href");
      const destination = selector ? document.querySelector(selector) : null;
      closeMenu({ restoreFocus: false, destination });
    });
  });

  panel.querySelector(".camp-cta-menu")?.addEventListener("click", () => {
    closeMenu({ restoreFocus: false });
  });

  let scheduled = false;
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateStickyState();
      updateActiveSection();
      scheduled = false;
    });
  }, { passive: true });

  updateStickyState();
  updateActiveSection();
})();

(() => {
  "use strict";

  const root = document.documentElement;
  const panel = document.querySelector(".conditions");
  if (!(panel instanceof HTMLElement)) return;

  const SOCHI_TIME_ZONE = "Europe/Moscow";
  const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=43.5855&longitude=39.7231&current=temperature_2m%2Cweather_code&daily=sunrise%2Csunset&timezone=Europe%2FMoscow&forecast_days=1";
  const MARINE_URL = "https://marine-api.open-meteo.com/v1/marine?latitude=43.55&longitude=39.69&current=sea_surface_temperature&timezone=Europe%2FMoscow&forecast_days=1";
  let solarTimes = null;
  let solarTimer = null;

  const field = (name) => panel.querySelector(`[data-condition="${name}"]`);
  const setField = (name, value) => {
    const element = field(name);
    if (element) element.textContent = value;
  };

  const isNumber = (value) => typeof value === "number" && Number.isFinite(value);
  const formatTemperature = (value) => {
    const rounded = Math.round(value);
    return `${rounded > 0 ? "+" : ""}${rounded}°`;
  };
  const formatClock = (value) => value?.split("T")[1]?.slice(0, 5) || null;
  const formatDate = (value) => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, day)));
  };
  const formatObservation = (value) => {
    if (!value) return null;
    const [date, time] = value.split("T");
    const [, month, day] = date.split("-");
    const clock = time?.slice(0, 5);
    return month && day && clock ? `${day}.${month} · ${clock}` : null;
  };
  const minutesFromIso = (value) => {
    const match = typeof value === "string" ? value.match(/T(\d{2}):(\d{2})/) : null;
    if (!match) return null;
    return (Number(match[1]) * 60) + Number(match[2]);
  };
  const sochiMinutesNow = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: SOCHI_TIME_ZONE,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const hour = Number(parts.find((part) => part.type === "hour")?.value);
    const minute = Number(parts.find((part) => part.type === "minute")?.value);
    return Number.isFinite(hour) && Number.isFinite(minute) ? (hour * 60) + minute : null;
  };
  const mixHex = (from, to, amount) => {
    const channels = (hex) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
    const a = channels(from);
    const b = channels(to);
    const t = Math.min(1, Math.max(0, amount));
    return `#${a.map((channel, index) => Math.round(channel + ((b[index] - channel) * t))
      .toString(16).padStart(2, "0")).join("")}`;
  };
  const solarPalette = (minute, sunrise, sunset) => {
    const dawnStart = Math.max(0, sunrise - 90);
    const solarNoon = sunrise + ((sunset - sunrise) / 2);
    const duskEnd = Math.min(1440, sunset + 90);
    const stops = [
      { at: 0, surface: "#c8d0d0", accent: "#6f898e", deep: "#081611" },
      { at: dawnStart, surface: "#ccd4d1", accent: "#789aa0", deep: "#0a1b15" },
      { at: sunrise, surface: "#ead7d7", accent: "#d06d83", deep: "#163025" },
      { at: solarNoon, surface: "#f4ead7", accent: "#319395", deep: "#0a2f20" },
      { at: sunset, surface: "#ead5c2", accent: "#c87451", deep: "#2a2118" },
      { at: duskEnd, surface: "#c9cfce", accent: "#708485", deep: "#091713" },
      { at: 1440, surface: "#c8d0d0", accent: "#6f898e", deep: "#081611" },
    ];
    const upperIndex = Math.max(1, stops.findIndex((stop) => minute <= stop.at));
    const from = stops[upperIndex - 1];
    const to = stops[upperIndex];
    const progress = to.at === from.at ? 0 : (minute - from.at) / (to.at - from.at);
    const phase = minute < dawnStart || minute >= duskEnd
      ? "night"
      : minute < sunrise + 60
        ? "dawn"
        : minute < sunset - 60
          ? "day"
          : "dusk";

    return {
      phase,
      progress: Math.min(1, Math.max(0, (minute - sunrise) / (sunset - sunrise))),
      surface: mixHex(from.surface, to.surface, progress),
      accent: mixHex(from.accent, to.accent, progress),
      deep: mixHex(from.deep, to.deep, progress),
    };
  };
  const updateSolarPalette = () => {
    if (!solarTimes) return;
    const minute = sochiMinutesNow();
    if (!isNumber(minute)) return;
    const palette = solarPalette(minute, solarTimes.sunrise, solarTimes.sunset);
    root.dataset.solarPhase = palette.phase;
    root.style.setProperty("--solar-surface-tint", palette.surface);
    root.style.setProperty("--solar-accent", palette.accent);
    root.style.setProperty("--solar-deep", palette.deep);
    root.style.setProperty("--solar-progress", palette.progress.toFixed(3));
  };
  const setSolarTimes = (sunriseValue, sunsetValue) => {
    const sunrise = minutesFromIso(sunriseValue);
    const sunset = minutesFromIso(sunsetValue);
    if (!isNumber(sunrise) || !isNumber(sunset) || sunset <= sunrise) return;
    solarTimes = { sunrise, sunset };
    updateSolarPalette();
    if (solarTimer === null) solarTimer = window.setInterval(updateSolarPalette, 5 * 60 * 1000);
  };
  const describeWeather = (code) => {
    if (!isNumber(code)) return "текущие условия";
    if (code === 0) return "ясно";
    if (code === 1) return "преимущественно ясно";
    if (code === 2) return "переменная облачность";
    if (code === 3) return "пасмурно";
    if (code === 45 || code === 48) return "туман";
    if (code >= 51 && code <= 57) return "морось";
    if (code >= 61 && code <= 67) return "дождь";
    if (code >= 71 && code <= 77) return "снег";
    if (code >= 80 && code <= 82) return "ливни";
    if (code === 85 || code === 86) return "снежные заряды";
    if (code >= 95) return "гроза";
    return "текущие условия";
  };

  const unavailable = (name, note = "не удалось обновить") => {
    setField(`${name}-value`, "Нет данных");
    setField(`${name}-note`, note);
  };

  const fetchJson = async (url, signal) => {
    const response = await fetch(url, { cache: "no-store", signal });
    if (!response.ok) throw new Error(`Open-Meteo returned ${response.status}`);
    return response.json();
  };

  const loadConditions = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);

    try {
      const [weatherResult, marineResult] = await Promise.allSettled([
        fetchJson(WEATHER_URL, controller.signal),
        fetchJson(MARINE_URL, controller.signal),
      ]);

      let availableGroups = 0;
      let observation = null;

      if (weatherResult.status === "fulfilled") {
        const current = weatherResult.value.current;
        const daily = weatherResult.value.daily;
        const sunrise = formatClock(daily?.sunrise?.[0]);
        const sunset = formatClock(daily?.sunset?.[0]);
        setSolarTimes(daily?.sunrise?.[0], daily?.sunset?.[0]);

        if (isNumber(current?.temperature_2m)) {
          setField("air-value", formatTemperature(current.temperature_2m));
          setField("air-note", describeWeather(current.weather_code));
          availableGroups += 1;
        } else {
          unavailable("air");
        }

        if (sunrise && sunset) {
          setField("daylight-value", `${sunrise} / ${sunset}`);
          setField("daylight-note", formatDate(daily?.time?.[0]) || "сегодня");
          availableGroups += 1;
        } else {
          unavailable("daylight");
        }

        observation = formatObservation(current?.time);
      } else {
        unavailable("air");
        unavailable("daylight");
      }

      if (marineResult.status === "fulfilled"
        && isNumber(marineResult.value.current?.sea_surface_temperature)) {
        setField("sea-value", formatTemperature(marineResult.value.current.sea_surface_temperature));
        setField("sea-note", "у берега");
        availableGroups += 1;
      } else {
        unavailable("sea");
      }

      if (availableGroups === 3) {
        setField("status", `Наблюдение ${observation || "обновлено"}`);
        setField("source-note", observation || "наблюдение обновлено");
      } else if (availableGroups > 0) {
        setField("status", `Часть данных недоступна${observation ? ` · ${observation}` : ""}`);
        setField("source-note", "часть данных недоступна");
      } else {
        setField("status", "Данные Open-Meteo сейчас недоступны");
        setField("source-note", "данные недоступны");
      }
    } catch (_) {
      unavailable("air");
      unavailable("sea");
      unavailable("daylight");
      setField("status", "Данные Open-Meteo сейчас недоступны");
      setField("source-note", "данные недоступны");
    } finally {
      window.clearTimeout(timeout);
      panel.setAttribute("aria-busy", "false");
    }
  };

  const resetPosition = () => { panel.scrollLeft = 0; };
  resetPosition();
  window.addEventListener("pageshow", resetPosition);
  void loadConditions();
})();
