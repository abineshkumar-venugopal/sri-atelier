import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import { ContactProvider } from "@/components/ContactDialog";
import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SRI ATELIER — Architecture & Interior Design Studio, Chennai",
    template: "%s — SRI ATELIER",
  },
  description:
    "SRI ATELIER is a Chennai-based architecture and interior design studio crafting residential, commercial, and cultural spaces across South India since 2008.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Set here rather than only from PageLoader's effect, so the page's
      // entrance animations are held from first paint instead of starting and
      // then pausing once React hydrates. PageLoader clears it.
      data-loading="true"
      className={cn(cormorant.variable, dmSans.variable, "h-full antialiased")}
    >
      <head>
        {/* Without JS the loader can never lift itself, so reveal the page. */}
        <noscript>
          <style>{`[data-page-loader]{display:none!important}html[data-loading="true"] body{overflow:visible!important}html[data-loading="true"] *{animation-play-state:running!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {/* Owns the one contact dialog; any ContactTrigger inside opens it. */}
        <ContactProvider>
          <Nav />
          {children}
        </ContactProvider>
      </body>
    </html>
  );
}
