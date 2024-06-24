import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import ToastProvider from "@/app/[locale]/toastifyProvider";
import { Suspense } from "react";
import { NavigationEvents } from "../../components/navigation-events";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Play Date',
  description:  '',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: any;
  };
}>) {
  return (
    <html suppressHydrationWarning lang={locale} dir={dir(locale)}>
      <body className={`${inter.className} flex flex-col  min-h-screen`}>
        <Header />
        <ToastProvider>{children}</ToastProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-NSEM8E8QYE" />
    </html>
  );
}
