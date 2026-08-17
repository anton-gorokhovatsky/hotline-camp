"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "camp-theme";
const THEME_CHANGE_EVENT = "camp-theme-change";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function getStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

function getTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  if (applied === "light" || applied === "dark") {
    return applied;
  }

  return getStoredTheme()
    ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function subscribeToTheme(onStoreChange: () => void) {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    const nextTheme = getStoredTheme()
      ?? (colorScheme.matches ? "dark" : "light");
    applyTheme(nextTheme);
    onStoreChange();
  };
  const handleSystemTheme = () => {
    if (getStoredTheme()) {
      return;
    }

    applyTheme(colorScheme.matches ? "dark" : "light");
    onStoreChange();
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);
  colorScheme.addEventListener("change", handleSystemTheme);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
    colorScheme.removeEventListener("change", handleSystemTheme);
  };
}

function saveTheme(theme: Theme) {
  applyTheme(theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "light");

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle service-island material-glass"
      type="button"
      onClick={() => saveTheme(nextTheme)}
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
