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
  const themeStatusLabel = theme === "dark" ? "Дневная версия" : "Ночная версия";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => saveTheme(nextTheme)}
      aria-label={`Включить ${nextTheme === "dark" ? "тёмную" : "светлую"} тему`}
    >
      <span className="theme-toggle-label">{themeStatusLabel}</span>
    </button>
  );
}
