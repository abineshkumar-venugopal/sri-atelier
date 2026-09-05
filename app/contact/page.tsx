import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import MinimalFooter from "@/components/MinimalFooter";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the FORMA studio in Adyar, Chennai — by message, phone, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <div className="contact-hero">
        <Reveal as="p" className="section-label">
          Reach Out
        </Reveal>
        <Reveal as="h1" className="contact-title" delay={1}>
          Contact
          <br />
          <em>Us</em>
        </Reveal>
      </div>
      <div className="contact-body">
        <div className="contact-form-col">
          <Reveal as="p" className="section-label">
            Send a Message
          </Reveal>
          <ContactForm />
        </div>
        <div className="contact-info-col">
          <p className="section-label" style={{ marginBottom: 40 }}>
            Studio Info
          </p>
          <div className="info-item">
            <p className="info-label">Address</p>
            <p className="info-value">
              42 Adyar Bridge Road
              <br />
              Adyar, Chennai — 600020
              <br />
              Tamil Nadu, India
            </p>
          </div>
          <div className="info-item">
            <p className="info-label">Phone</p>
            <p className="info-value">+91 98400 00000</p>
          </div>
          <div className="info-item">
            <p className="info-label">Email</p>
            <p className="info-value">hello@forma.studio</p>
          </div>
          <div className="info-item">
            <p className="info-label">Studio Hours</p>
            <p className="info-value">Mon – Fri, 9am – 6pm</p>
          </div>
          <a href="https://wa.me/919840000000" className="whatsapp-btn">
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
