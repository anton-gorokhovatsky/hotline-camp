import type { MouseEventHandler } from "react";

const TELEGRAM_URL = "https://t.me/DDopenChat";

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

export function CampCta({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      className={["camp-cta", className].filter(Boolean).join(" ")}
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
    >
      <span>Обсудить участие</span>
      <ArrowUpRight />
    </a>
  );
}
