import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "../features/public-shell/components/SiteFooter";
import { SiteHeader } from "../features/public-shell/components/SiteHeader";
import { site } from "../content/site";

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
        alt: "Kingdom of Israel (KOI)",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
        <div className="site-frame">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
