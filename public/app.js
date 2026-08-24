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
    const statusLabel = theme === "dark" ? "Дневная тема" : "Ночная тема";
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
      if (moon) moon.toggleAttribute("hidden", nextTheme !== "dark");
      if (sun) sun.toggleAttribute("hidden", nextTheme !== "light");
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
  const motionToggles = [...document.querySelectorAll("[data-motion-toggle]")];
  const systemMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storageKey = "camp-motion";

  const storedMotion = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "full" || value === "reduce" ? value : null;
    } catch (_) {
      return null;
    }
  };

  const currentMotion = () => root.dataset.motion === "reduce" ? "reduce" : "full";
  const updateMotionControls = (motion) => {
    const isReduced = motion === "reduce";
    motionToggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(isReduced));
      const label = toggle.querySelector(".motion-toggle-label");
      if (label) label.textContent = isReduced ? "Включить движение" : "Остановить движение";
      const pause = toggle.querySelector(".motion-toggle-icon--pause");
      const play = toggle.querySelector(".motion-toggle-icon--play");
      if (pause) pause.toggleAttribute("hidden", isReduced);
      if (play) play.toggleAttribute("hidden", !isReduced);
    });
  };
  const applyMotion = (motion, persist = false) => {
    root.dataset.motion = motion;
    if (persist) {
      try { localStorage.setItem(storageKey, motion); } catch (_) {}
    }
    updateMotionControls(motion);
    window.dispatchEvent(new CustomEvent("campmotionchange", { detail: { reduced: motion === "reduce" } }));
  };

  applyMotion(storedMotion() || (systemMotion.matches ? "reduce" : "full"));
  motionToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      applyMotion(currentMotion() === "reduce" ? "full" : "reduce", true);
    });
  });
  systemMotion.addEventListener("change", (event) => {
    if (!storedMotion()) applyMotion(event.matches ? "reduce" : "full");
  });
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) applyMotion(storedMotion() || (systemMotion.matches ? "reduce" : "full"));
  });
})();

(() => {
  "use strict";

  const countdowns = [...document.querySelectorAll("[data-camp-countdown]")];
  if (!countdowns.length) return;

  const SOCHI_TIME_ZONE = "Europe/Moscow";
  const CAMP_START_DAY = Date.UTC(2026, 8, 27);
  const CAMP_END_DAY = Date.UTC(2026, 9, 4);
  const DAY_MS = 86_400_000;

  const sochiCalendarDay = () => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: SOCHI_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const year = Number(parts.find((part) => part.type === "year")?.value);
    const month = Number(parts.find((part) => part.type === "month")?.value);
    const day = Number(parts.find((part) => part.type === "day")?.value);
    return Date.UTC(year, month - 1, day);
  };

  const dayWord = (days) => {
    const mod100 = days % 100;
    const mod10 = days % 10;
    if (mod100 >= 11 && mod100 <= 14) return "дней";
    if (mod10 === 1) return "день";
    if (mod10 >= 2 && mod10 <= 4) return "дня";
    return "дней";
  };

  const getCountdown = () => {
    const today = sochiCalendarDay();
    if (today < CAMP_START_DAY) {
      const days = Math.round((CAMP_START_DAY - today) / DAY_MS);
      return { value: `${days} ${dayWord(days)}`, label: "до старта кэмпа" };
    }
    if (today === CAMP_START_DAY) return { value: "Сегодня", label: "стартует кэмп" };
    if (today <= CAMP_END_DAY) return { value: "Кэмп идёт", label: "до 4 октября" };
    return { value: "Кэмп завершён", label: "27 сентября — 4 октября" };
  };

  const updateCountdowns = () => {
    const countdown = getCountdown();
    countdowns.forEach((element) => {
      const value = element.querySelector("[data-camp-countdown-value]");
      const label = element.querySelector("[data-camp-countdown-label]");
      if (value) value.textContent = countdown.value;
      if (label) label.textContent = countdown.label;
    });
  };

  updateCountdowns();
  window.setInterval(updateCountdowns, 60 * 60 * 1000);
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
    const shouldMove = destination instanceof HTMLElement;
    const scrollBehavior = root.dataset.motion === "reduce" ? "auto" : "smooth";
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
    if (shouldMove) {
      window.history.pushState(null, "", `#${destination.id}`);
      window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
        destination.scrollIntoView({ behavior: scrollBehavior, block: "start" });
        window.requestAnimationFrame(() => {
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
  const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=43.5855&longitude=39.7231&current=temperature_2m%2Cweather_code%2Cwind_speed_10m%2Cwind_direction_10m&wind_speed_unit=ms&daily=sunrise%2Csunset&timezone=Europe%2FMoscow&forecast_days=1";
  const MARINE_URL = "https://marine-api.open-meteo.com/v1/marine?latitude=43.55&longitude=39.69&current=sea_surface_temperature&timezone=Europe%2FMoscow&forecast_days=1";
  let solarTimes = null;
  let solarTimer = null;

  const setField = (name, value) => {
    document.querySelectorAll(`[data-condition="${name}"]`).forEach((element) => {
      element.textContent = value;
    });
  };

  const isNumber = (value) => typeof value === "number" && Number.isFinite(value);
  const formatTemperature = (value) => {
    const rounded = Math.round(value);
    return `${rounded > 0 ? "+" : ""}${rounded}°`;
  };
  const formatWind = (speed, direction) => {
    if (!isNumber(speed)) return null;
    if (speed < 0.5) return { value: "штиль", note: "штиль" };
    const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
    const normalized = isNumber(direction) ? ((direction % 360) + 360) % 360 : null;
    const compass = normalized === null ? null : directions[Math.round(normalized / 45) % directions.length];
    const value = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(speed);
    const reading = `${value} м/с${compass ? `, ${compass}` : ""}`;
    return { value: reading, note: `ветер ${reading}` };
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
        const wind = formatWind(current?.wind_speed_10m, current?.wind_direction_10m);

        if (wind) setField("wind-value", wind.value);
        else unavailable("wind");

        if (isNumber(current?.temperature_2m)) {
          setField("air-value", formatTemperature(current.temperature_2m));
          setField("air-note", [describeWeather(current.weather_code), wind?.note].filter(Boolean).join(" · "));
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
        unavailable("wind");
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
      unavailable("wind");
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

(() => {
  "use strict";

  const root = document.documentElement;
  const host = document.querySelector(".race-rhythm");
  const programNotes = document.querySelector(".program-notes");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!(host instanceof HTMLElement) || !(programNotes instanceof HTMLOListElement)) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return;

  const vertexSource = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fragmentSource = `
    precision highp float;uniform vec2 r;uniform float time,dark,reduced;const float PI=3.14159265;
    float sat(float x){return clamp(x,0.,1.);}float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float bell(float x,float a,float b,float c,float d){return smoothstep(a,b,x)*(1.-smoothstep(c,d,x));}
    float water(vec2 d,float t){float back=(1.-smoothstep(-.03,.08,d.x))*exp(d.x*.78)*exp(-abs(d.y)*1.8);float stroke=.86+.14*cos(t*PI*2.2);float rings=sin(length(vec2(d.x*.62,d.y))*38.-t*7.2);float cross=sin(d.x*17.+sin(d.y*9.-t*1.5)*2.4);return(rings*.72+cross*.28)*back*stroke;}
    float air(vec2 d,float t){float trail=(1.-smoothstep(-.035,.1,d.x))*exp(d.x*.82);float core=exp(-abs(d.y)*4.8);float shear=d.y*6.*exp(-abs(d.y)*5.4);float cadence=.55+.45*cos(-d.x*34.-t*PI*3.);float slip=sin(-d.x*17.-t*PI*3.)*core*.16;return(-shear*cadence*1.7+slip)*trail;}
    float pause(vec2 d,float t,float phase){float envelope=exp(-abs(d.x)*6.4);float shear=d.y*5.2*exp(-abs(d.y)*5.2);float breath=.72+.28*cos(t*PI*2.+phase);return-shear*envelope*breath;}
    float stride(vec2 uv,float p,float aspect){float f=0.;for(int i=0;i<8;i++){float q=.765+float(i)*.032,age=p-q;if(age>0.&&age<.085){float x=mix(-aspect*.56,aspect*.56,q),side=mod(float(i),2.)<1.?1.:-1.;float spread=.026+age*.52,dx=(uv.x-x)/spread;float column=exp(-dx*dx),height=exp(-pow((uv.y+.02)/.48,2.));float snap=sin(clamp(age/.085,0.,1.)*PI);f+=side*column*height*snap*(1.+side*uv.y*.82);}}return f;}
    void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;float aspect=r.x/r.y;float p=mod(time,10.4)/10.4,sx=mix(-aspect*.56,aspect*.56,p);float sy=p>.76?.055*abs(sin((p-.76)*78.)):0.;vec2 d=uv-vec2(sx,sy);float w=1.-smoothstep(.27,.35,p),b=bell(p,.29,.38,.66,.75),run=smoothstep(.69,.78,p);float t1=bell(p,.265,.29,.34,.37),t2=bell(p,.665,.69,.74,.77);float field=water(d,time)*w+air(d,time)*b+stride(uv,p,aspect)*run+pause(d,time,0.)*t1+pause(d,time,PI)*t2;if(reduced>.5){field=water(uv-vec2(-aspect*.37,0.),9.2)*.72+air(uv-vec2(0.,0.),9.2)*.82;field+=stride(uv,.97,aspect*.7)*.85;}float edge=.34+.045*sin(uv.x*2.2)+.025*sin(uv.x*5.7+1.4);float band=1.-smoothstep(edge,edge+.12,abs(uv.y));band*=smoothstep(-aspect*.61,-aspect*.49,uv.x)*(1.-smoothstep(aspect*.49,aspect*.61,uv.x));float paperNoise=(hash(floor(gl_FragCoord.xy*.42))-.5)*.018;float threads=pow(.5+.5*cos((uv.y+field*.075)*92.+sin(uv.x*3.)*.7),11.);float body=band*sat(.075+abs(field)*.3+threads*.34);float signal=.48+.06*cos(time*PI*2.2);signal=mix(signal,.53+.11*(.5+.5*cos(time*PI*3.)),sat(b));signal=mix(signal,.55+.14*abs(sin((p-.76)*78.)),run);signal*=1.-.18*sat(t1+t2);float heat=reduced>.5?0.:exp(-length(d*vec2(.82,1.15))*8.)*signal;float glow=sat(heat)*band;float opacity=1.-(1.-body)*(1.-glow);vec3 sea=mix(vec3(.25,.43,.43),vec3(.56,.68,.66),dark);vec3 rose=mix(vec3(.79,.26,.37),vec3(.91,.43,.53),dark);vec3 ink=(sea*body*(1.-glow)+rose*glow)/max(opacity,.001);ink+=paperNoise*.7;gl_FragColor=vec4(ink*opacity,opacity);}
  `;
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch (error) {
    console.warn("Race field preview is unavailable", error);
    return;
  }

  const style = document.createElement("style");
  style.dataset.raceField = "";
  style.textContent = `
    .race-rhythm.race-rhythm--field{display:block;width:calc(100% + var(--space-page) + var(--space-page));margin:var(--program-space-major) calc(var(--space-page) * -1) 0;overflow:hidden}
    .race-rhythm--field canvas{display:block;width:100%;height:clamp(13.5rem,16vw,16rem);background:transparent}
    @media(max-width:62rem){.race-rhythm.race-rhythm--field{display:block;margin-top:var(--program-space-major)}.race-rhythm--field canvas{height:clamp(13rem,56vw,14.5rem)}}
  `;
  document.head.append(style);
  programNotes.after(host);
  host.classList.add("race-rhythm--field");
  host.setAttribute("aria-label", "Одна непрерывная среда меняется под движением пловца, велосипедиста и бегуна.");
  host.replaceChildren(canvas);
  host.hidden = false;

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const point = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(point);
  gl.vertexAttribPointer(point, 2, gl.FLOAT, false, 0, 0);
  const uniform = (name) => gl.getUniformLocation(program, name);
  const resolution = uniform("r");
  const clock = uniform("time");
  const theme = uniform("dark");
  const still = uniform("reduced");
  const startedAt = performance.now();
  let frameRequest = 0;
  const motionIsReduced = () => root.dataset.motion === "reduce";

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(canvas.clientWidth * scale));
    const height = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(resolution, width, height);
  };
  const frame = (now) => {
    resize();
    const motionReduced = motionIsReduced();
    gl.uniform1f(clock, motionReduced ? 9.8 : (now - startedAt) / 1000);
    gl.uniform1f(theme, root.dataset.theme === "dark" ? 1 : 0);
    gl.uniform1f(still, motionReduced ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!motionReduced) frameRequest = window.requestAnimationFrame(frame);
  };
  const restart = () => {
    window.cancelAnimationFrame(frameRequest);
    frameRequest = window.requestAnimationFrame(frame);
  };

  reduceMotion.addEventListener("change", restart);
  window.addEventListener("campmotionchange", restart);
  new MutationObserver(() => { if (motionIsReduced()) restart(); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  window.addEventListener("resize", () => { if (motionIsReduced()) restart(); });
  canvas.addEventListener("webglcontextlost", (event) => { event.preventDefault(); window.cancelAnimationFrame(frameRequest); });
  restart();
})();
