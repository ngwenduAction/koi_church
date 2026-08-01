import type {Metadata} from "next";
import type {ReactNode} from "react";
import {Fraunces, Inter} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import "./globals.css";
import {site} from "../content/site";
import enMessages from "../messages/en.json";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000");
const socialImage = "/KOI_logo/KOI_Large_Site_Icon.png";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} | Sabbath Bible Study`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/KOI_logo/KOI Favicon.png",
    apple: "/KOI_logo/KOI_Apple_Touch_Icon.png",
  },
  openGraph: {
    title: `${site.name} | Sabbath Bible Study`,
    description: site.description,
    siteName: site.name,
    type: "website",
    locale: "en_ZA",
    url: metadataBase,
    images: [
      {
        url: socialImage,
        width: 1024,
        height: 1024,
        alt: "Israel of God (IOG)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Sabbath Bible Study`,
    description: site.description,
    images: [socialImage],
  },
};

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

