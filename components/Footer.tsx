import Link from "next/link";
import Image from "next/image";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import SocialLinks from "@/components/SocialLinks";
import { ContactTrigger } from "@/components/ContactDialog";
import { studio } from "@/lib/data";

/** `contact` entries open the contact dialog instead of navigating. */
const columns: {
  title: string;
  links: { label: string; href?: string; contact?: boolean }[];
}[] = [
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
      { href: "/#services", label: "Interior Design" },
      { href: "/#services", label: "Exterior Design" },
      { href: "/#services", label: "Construction" },
      { href: "/#services", label: "Consultation" },
    ],
  },
  {
    title: "Connect",
    links: [
      // { href: "/quote", label: "Get a Quote" },
      { label: "Contact Us", contact: true },
      { label: "Work With Us", contact: true },
    ],
  },
];

const contactDetails = [
  { Icon: MailIcon, href: `mailto:${studio.email}`, lines: [studio.email] },
  { Icon: PhoneIcon, href: studio.phoneHref, lines: [studio.phone] },
  { Icon: MapPinIcon, lines: studio.address },
];

const linkClass =
  "text-[0.9rem] text-ash transition-colors duration-300 hover:text-terracotta";

export default function Footer() {
  return (
    <footer className="border-t border-fog bg-mist px-6 pt-16 pb-8 md:px-15">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-15">
        <div>
          {/* Intrinsic size is 1672x940; height is set in CSS and width follows. */}
          <Image
            src="/logo_black.png"
            alt="Sri Atelier"
            width={1672}
            height={940}
            sizes="160px"
            className="mb-5 h-16 w-auto"
          />
          <p className="mt-2 text-[0.875rem] text-ash">
            Architecture &amp; Interior Design Studio, Chennai
          </p>

          <ul className="mt-8 space-y-4">
            {contactDetails.map(({ Icon, href, lines }) => (
              <li key={lines[0]} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4.5 shrink-0 text-terracotta" />
                {href ? (
                  <a href={href} className={linkClass}>
                    {lines[0]}
                  </a>
                ) : (
                  <span className="text-[0.9rem] leading-[1.7] text-ash">
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
            <p className="mb-5 font-display text-[1.2rem] font-semibold text-ink">
              {column.title}
            </p>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.contact ? (
                    <ContactTrigger>
                      <button type="button" className={linkClass}>
                        {link.label}
                      </button>
                    </ContactTrigger>
                  ) : (
                    <Link href={link.href ?? "/"} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-fog pt-8 text-center text-[0.85rem] text-ash">
        Copyright © {new Date().getFullYear()} Sri Atelier | All rights
        reserved.
      </div>
    </footer>
  );
}
