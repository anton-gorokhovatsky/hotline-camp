import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hotline — триатлонный кэмп в\u00a0Сочи",
    template: "%s · Hotline",
  },
  description: "Триатлонный кэмп Hotline в\u00a0Сочи, 27\u00a0сентября–4\u00a0октября 2026\u00a0года.",
  icons: {
    icon: "./favicon.svg",
    shortcut: "./favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2eee7" },
    { media: "(prefers-color-scheme: dark)", color: "#101313" },
  ],
};

const themeScript = `
  try {
    const stored = localStorage.getItem('camp-theme');
    const theme = stored === 'dark' || stored === 'light'
      ? stored
      : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
