import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "../features/public-shell/components/SiteFooter";
import { SiteHeader } from "../features/public-shell/components/SiteHeader";
import { site } from "../content/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Sabbath Bible Study`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-frame">
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
