"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

import { CampCta } from "./camp-cta";
import { ThemeToggle } from "./theme-toggle";

const menuLinks = [
  { href: "#program", label: "Программа" },
  { href: "#trainers", label: "Тренеры" },
  { href: "#registration", label: "Участие" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const scrollPosition = window.scrollY;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    root.classList.add("menu-open");
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";
    firstLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      buttonRef.current?.focus();
    };

    const keepFocusInsideMenu = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const panelItems = panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          )
        : [];
      const focusableItems = [buttonRef.current, ...panelItems].filter(
        (item): item is HTMLElement => item !== null,
      );
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("keydown", keepFocusInsideMenu);
    return () => {
      const previousScrollBehavior = root.style.scrollBehavior;

      root.classList.remove("menu-open");
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollPosition);
      root.style.scrollBehavior = previousScrollBehavior;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("keydown", keepFocusInsideMenu);
    };
  }, [isOpen]);

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      window.history.pushState(null, "", href);
      document.querySelector(href)?.scrollIntoView({ block: "start" });
    });
  };

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
          ref={panelRef}
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
                onClick={(event) => navigateFromMenu(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu-details">
            <p className="mobile-menu-dates">
              <span>Сочи · Сириус</span>
              <strong>27 сентября — 4 октября</strong>
            </p>
            <CampCta
              className="camp-cta-menu"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="mobile-menu-theme">
            <ThemeToggle variant="menu" />
          </div>
        </nav>
      ) : null}
    </div>
  );
}
