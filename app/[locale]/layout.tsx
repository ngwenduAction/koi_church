import type {ReactNode} from "react";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {routing, type Locale} from "../../i18n/routing";
import {SiteFooter} from "../../features/public-shell/components/SiteFooter";
import {SiteHeader} from "../../features/public-shell/components/SiteHeader";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <NextIntlClientProvider>
      <div className="site-frame" data-koi-locale={locale}>
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}

