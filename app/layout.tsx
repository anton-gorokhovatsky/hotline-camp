import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const onest = localFont({
  src: "../public/fonts/Onest-Variable.ttf",
  display: "swap",
  style: "normal",
  weight: "100 900",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anton-gorokhovatsky.github.io/hotline-camp/"),
  title: {
    default: "Тренировочный сбор по\u00a0триатлону в\u00a0Сочи",
    template: "%s · Сочи",
  },
  description: "Тренировочный сбор по\u00a0триатлону в\u00a0Сочи, 27\u00a0сентября — 4\u00a0октября.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Тренировочный сбор по триатлону в Сочи",
    title: "Тренировочный сбор по триатлону в Сочи",
    description:
      "Собираем накопленную форму в\u00a0готовность к\u00a0конкретной гонке.",
    url: "./",
    images: [
      {
        url: "./og.png",
        width: 1729,
        height: 910,
        alt: "Тренировочный сбор по триатлону в Сочи, 27 сентября — 4 октября",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тренировочный сбор по триатлону в Сочи",
    description:
      "Собираем накопленную форму в\u00a0готовность к\u00a0конкретной гонке.",
    images: ["./og.png"],
  },
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
    { media: "(prefers-color-scheme: dark)", color: "#101110" },
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
      <body className={onest.variable}>{children}</body>
    </html>
  );
}
