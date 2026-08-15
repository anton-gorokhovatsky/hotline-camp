"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem("camp-theme");
      const initial = stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      setTheme(initial);
      applyTheme(initial);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
        window.localStorage.setItem("camp-theme", nextTheme);
      }}
      aria-label={`Включить ${nextTheme === "dark" ? "тёмную" : "светлую"} тему`}
      title={`Включить ${nextTheme === "dark" ? "тёмную" : "светлую"} тему`}
    >
      <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
      </svg>
    </button>
  );
}
