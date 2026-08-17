"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "./theme-toggle";

const menuLinks = [
  { href: "#program", label: "Программа" },
  { href: "#trainers", label: "Тренеры" },
  { href: "#registration", label: "Участие" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      buttonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-menu">
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {isOpen ? (
            <path d="M5 5l14 14M19 5 5 19" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {isOpen ? (
        <nav
          className="mobile-menu-panel"
          id="mobile-menu-panel"
          aria-label="Меню страницы"
        >
          <div className="mobile-menu-links">
            {menuLinks.map((link, index) => (
              <a
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu-theme">
            <ThemeToggle variant="menu" />
          </div>
        </nav>
      ) : null}
    </div>
  );
}
