"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import { ContactTrigger } from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";

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
  // No services page: this lands on the section of the home page, from anywhere.
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/projects", label: "Projects" },
  // The call to action: a button that opens the contact dialog, not a page.
  { href: "#contact", label: "Contact", cta: true },
];

/**
 * Home only matches exactly; every other entry also covers its detail pages,
 * so /projects/meridian-house keeps Projects marked as the current section.
 */
const isCurrent = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

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
      // Over the hero the bar sits well inside its corners and stands taller;
      // as it solidifies it tightens outward to the page gutter and shortens.
      // Padding is in the transition list, so both edges ease rather than jump.
      className="group fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-10 py-6 transition-[background-color,padding,box-shadow] duration-500 ease-forma data-[scrolled=true]:bg-paper/94 data-[scrolled=true]:px-6 data-[scrolled=true]:py-3.5 data-[scrolled=true]:shadow-[0_1px_0_rgb(0_0_0/8%)] data-[scrolled=true]:backdrop-blur-[14px] md:px-28 md:py-8 md:data-[scrolled=true]:px-15 md:data-[scrolled=true]:py-4.5"
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative block h-14 w-52 shrink-0 md:h-16 md:w-64"
      >
        {/* White logo */}
        <Image
          src="/logo_white.png"
          alt="Sri Atelier"
          fill
          priority
          sizes="(max-width: 768px) 208px, 256px"
          className={`object-contain object-left transition-opacity duration-400 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Black logo */}
        <Image
          src="/logo_black.png"
          alt="Sri Atelier"
          fill
          priority
          sizes="(max-width: 768px) 208px, 256px"
          className={`object-contain object-left transition-opacity duration-400 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-10 md:flex">
        {links.map((link) => {
          const current = isCurrent(pathname, link.href);
          if (link.cta) {
            return (
              <ContactTrigger key={link.href}>
                <Button
                  variant="dark"
                  // A pill, which --radius: 0 would otherwise square off.
                  className="rounded-full px-6 py-2.5 text-[0.75rem] tracking-[0.15em]"
                >
                  {link.label}
                </Button>
              </ContactTrigger>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              data-current={current}
              aria-current={current ? "page" : undefined}
              className="relative text-[0.75rem] uppercase tracking-[0.15em] text-paper/80 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-[3px] after:h-px after:origin-right after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-400 after:ease-forma hover:after:origin-left hover:after:scale-x-100 data-[current=true]:text-paper data-[current=true]:after:origin-left data-[current=true]:after:scale-x-100 group-data-[scrolled=true]:text-ash group-data-[scrolled=true]:hover:text-ink group-data-[scrolled=true]:data-[current=true]:text-ink"
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu */}
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
            {links.map((link) => {
              const current = isCurrent(pathname, link.href);
              if (link.cta) {
                return (
                  // SheetClose shuts the menu as the dialog opens over it.
                  <SheetClose key={link.href} asChild>
                    <ContactTrigger>
                      <Button
                        variant="dark"
                        className="mt-3 w-full rounded-full py-3 text-[0.75rem] tracking-[0.15em]"
                      >
                        {link.label}
                      </Button>
                    </ContactTrigger>
                  </SheetClose>
                );
              }
              return (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    data-current={current}
                    aria-current={current ? "page" : undefined}
                    className="relative border-l-2 border-transparent pl-4 text-label uppercase tracking-[0.15em] text-ash transition-colors duration-300 hover:text-terracotta data-[current=true]:border-terracotta data-[current=true]:text-ink"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
