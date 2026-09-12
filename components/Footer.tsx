import Link from "next/link";
import Image from "next/image";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import SocialLinks from "@/components/SocialLinks";

const columns = [
  {
    title: "Studio",
    links: [
      { href: "/about", label: "Who We Are" },
      { href: "/projects", label: "Our Projects" },
      { href: "/about", label: "Our Team" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/contact", label: "Interior Design" },
      { href: "/contact", label: "Exterior Design" },
      { href: "/contact", label: "Construction" },
      { href: "/contact", label: "Consultation" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/quote", label: "Get a Quote" },
      { href: "/contact", label: "Contact Us" },
      { href: "/contact", label: "Work With Us" },
    ],
  },
];

const contactDetails = [
  {
    Icon: MailIcon,
    href: "mailto:hello@forma.studio",
    lines: ["hello@forma.studio"],
  },
  {
    Icon: PhoneIcon,
    href: "tel:+919840000000",
    lines: ["+91 98400 00000"],
  },
  {
    Icon: MapPinIcon,
    lines: ["42 Adyar Bridge Road, Adyar,", "Chennai — 600020, Tamil Nadu"],
  },
];

const linkClass =
  "text-[0.82rem] text-ash transition-colors duration-300 hover:text-paper";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-ink px-6 pt-16 pb-8 md:px-15">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-15">
        <div>
          {/* Intrinsic size is 1672x940; height is set in CSS and width follows. */}
          <Image
            src="/logo_white.png"
            alt="Sri Atelier"
            width={1672}
            height={940}
            sizes="160px"
            className="mb-5 h-16 w-auto"
          />
          <div className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-paper">
            Sri Atelier
          </div>
          <p className="mt-1.5 text-[0.8rem] text-ash">
            Architecture &amp; Interior Design Studio, Chennai
          </p>

          <ul className="mt-8 space-y-4">
            {contactDetails.map(({ Icon, href, lines }) => (
              <li key={lines[0]} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-brass" />
                {href ? (
                  <a href={href} className={linkClass}>
                    {lines[0]}
                  </a>
                ) : (
                  <span className="text-[0.82rem] leading-[1.7] text-ash">
                    {lines.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <SocialLinks className="mt-8" />
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="mb-5 font-display text-[1.05rem] font-semibold text-paper">
              {column.title}
            </p>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-white/6 pt-8 text-center text-label text-ash">
        Copyright © {new Date().getFullYear()} Sri Atelier | All rights reserved.
      </div>
    </footer>
  );
}
