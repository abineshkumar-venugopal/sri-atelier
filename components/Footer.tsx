import Link from "next/link";

const navigate = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Interior Design",
  "Exterior Design",
  "Construction",
  "Consultation",
];

const contact = [
  { href: "mailto:hello@forma.studio", label: "hello@forma.studio" },
  { href: "tel:+919840000000", label: "+91 98400 00000" },
  { href: "#", label: "Chennai, Tamil Nadu" },
  { href: "/quote", label: "Get a Quote" },
];

const columnTitle = "mb-5 text-eyebrow uppercase tracking-[0.2em] text-brass";
const linkClass =
  "text-[0.82rem] text-ash transition-colors duration-300 hover:text-paper";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-ink px-6 pt-15 pb-10 md:px-15">
      <div className="mb-15 grid gap-15 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 font-display text-2xl font-semibold uppercase tracking-[0.12em] text-paper">
            FORMA
          </div>
          <p className="max-w-65 text-[0.82rem] leading-[1.8] text-ash">
            Architecture &amp; Interior Design Studio. Crafting spaces where
            beauty and purpose meet.
          </p>
        </div>

        <div>
          <p className={columnTitle}>Navigate</p>
          <ul className="space-y-2.5">
            {navigate.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={columnTitle}>Services</p>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service}>
                <a href="#" className={linkClass}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={columnTitle}>Contact</p>
          <ul className="space-y-2.5">
            {contact.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/6 pt-8 text-label text-ash">
        <span>© 2024 Forma Architecture Studio</span>
        <div className="flex gap-5">
          {["Instagram", "Behance", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-label uppercase tracking-[0.1em] text-ash transition-colors duration-300 hover:text-brass"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
