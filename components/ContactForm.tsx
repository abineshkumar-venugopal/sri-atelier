"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <div ref={nameRef} className={cn("mb-8", revealClassName(nameVisible))}>
        <Label htmlFor="contact-name">Your Name</Label>
        <Input id="contact-name" type="text" placeholder="Full name" />
      </div>
      <div ref={phoneRef} className={cn("mb-8", revealClassName(phoneVisible, 1))}>
        <Label htmlFor="contact-phone">Phone Number</Label>
        <Input id="contact-phone" type="tel" placeholder="+91 00000 00000" />
      </div>
      <div ref={messageRef} className={cn("mb-8", revealClassName(messageVisible, 2))}>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" placeholder="Tell us about your project…" />
      </div>
      <Button
        ref={submitRef}
        variant="dark"
        className={cn("mt-2", revealClassName(submitVisible, 3))}
      >
        Send Message
      </Button>
    </>
  );
}
