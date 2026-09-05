"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get Quote" },
];

/**
 * Transparent over the homepage hero, solid once scrolled past it. Every other
 * route starts solid. `data-scrolled` on the nav drives the logo and link
 * colours via group-data-*, so the state lives in one place.
 */
export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = !isHome || scrollY > 60;

  return (
    <nav
      data-scrolled={scrolled}
      className="group fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-6 py-5 transition-[background-color,padding,box-shadow] duration-500 ease-forma data-[scrolled=true]:bg-paper/94 data-[scrolled=true]:py-3.5 data-[scrolled=true]:shadow-[0_1px_0_rgb(0_0_0/8%)] data-[scrolled=true]:backdrop-blur-[14px] md:px-15 md:py-7 md:data-[scrolled=true]:py-4.5"
    >
      <Link
        href="/"
        className="font-display text-2xl font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-400 group-data-[scrolled=true]:text-ink"
      >
        FORMA
      </Link>

      <div className="hidden gap-10 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-[0.75rem] uppercase tracking-[0.15em] text-paper/80 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-[3px] after:h-px after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-400 after:ease-forma hover:after:origin-left hover:after:scale-x-100 group-data-[scrolled=true]:text-ash group-data-[scrolled=true]:hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Sheet>
        <SheetTrigger
          aria-label="Open menu"
          className="text-paper transition-colors duration-400 outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[scrolled=true]:text-ink md:hidden"
        >
          <MenuIcon className="size-6" />
        </SheetTrigger>
        <SheetContent side="right" className="w-3/4 max-w-xs px-6 py-20">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex flex-col gap-7">
            {links.map((link) => (
              <SheetClose key={link.href} asChild>
                <Link
                  href={link.href}
                  className="text-label uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:text-brass"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
