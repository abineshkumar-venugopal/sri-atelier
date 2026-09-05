"use client";

import { useRef } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";

export default function ContactForm() {
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const nameVisible = useRevealVisible(nameRef);
  const phoneVisible = useRevealVisible(phoneRef);
  const messageVisible = useRevealVisible(messageRef);
  const submitVisible = useRevealVisible(submitRef);

  return (
    <>
      <div ref={nameRef} className={`form-group ${revealClassName(nameVisible)}`}>
        <label className="form-label">Your Name</label>
        <input type="text" className="form-input" placeholder="Full name" />
      </div>
      <div ref={phoneRef} className={`form-group ${revealClassName(phoneVisible, 1)}`}>
        <label className="form-label">Phone Number</label>
        <input type="tel" className="form-input" placeholder="+91 00000 00000" />
      </div>
      <div ref={messageRef} className={`form-group ${revealClassName(messageVisible, 2)}`}>
        <label className="form-label">Message</label>
        <textarea className="form-textarea" placeholder="Tell us about your project…" />
      </div>
      <button
        ref={submitRef}
        className={`btn btn-dark ${revealClassName(submitVisible, 3)}`}
        style={{ marginTop: 8 }}
      >
        Send Message
      </button>
    </>
  );
}
