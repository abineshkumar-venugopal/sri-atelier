import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import MinimalFooter from "@/components/MinimalFooter";
import { eyebrowClass } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the FORMA studio in Adyar, Chennai — by message, phone, or WhatsApp.",
};

const studioInfo = [
  {
    label: "Address",
    value: ["42 Adyar Bridge Road", "Adyar, Chennai — 600020", "Tamil Nadu, India"],
  },
  { label: "Phone", value: ["+91 98400 00000"] },
  { label: "Email", value: ["hello@forma.studio"] },
  { label: "Studio Hours", value: ["Mon – Fri, 9am – 6pm"] },
];

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-mist px-6 pt-40 pb-20 md:px-15">
        <Reveal as="p" className={eyebrowClass}>
          Reach Out
        </Reveal>
        <Reveal
          as="h1"
          className="font-display text-[clamp(4rem,8vw,7rem)] font-light leading-[0.9] tracking-[-0.02em]"
          delay={1}
        >
          Contact
          <br />
          <em className="italic text-brass">Us</em>
        </Reveal>
      </div>

      <div className="grid min-h-[60vh] md:grid-cols-2">
        <div className="border-r border-mist px-6 py-20 md:px-15">
          <Reveal as="p" className={eyebrowClass}>
            Send a Message
          </Reveal>
          <ContactForm />
        </div>

        <div className="bg-mist px-6 py-20 md:px-15">
          <p className={cn(eyebrowClass, "mb-10")}>Studio Info</p>

          {studioInfo.map((item) => (
            <div key={item.label} className="mb-12">
              <p className="mb-2 text-micro uppercase tracking-[0.2em] text-brass">
                {item.label}
              </p>
              <p className="font-display text-[1.1rem] font-light leading-[1.6]">
                {item.value.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}

          <a
            href="https://wa.me/919840000000"
            className="mt-10 inline-flex items-center gap-2.5 bg-[#25d366] px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.15em] text-paper transition-all duration-300 hover:bg-[#1da851]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.395 5.608L0 24l6.518-1.366A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 01-5.003-1.367l-.36-.214-3.865.81.822-3.768-.234-.387A9.819 9.819 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <MinimalFooter />
    </>
  );
}
