import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
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
    default: "FORMA — Architecture & Interior Design Studio, Chennai",
    template: "%s — FORMA",
  },
  description:
    "FORMA is a Chennai-based architecture and interior design studio crafting residential, commercial, and cultural spaces across South India since 2008.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(cormorant.variable, dmSans.variable, "h-full antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
