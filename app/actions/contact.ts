"use server";

import { Resend } from "resend";

import {
  buildEnquiryEmail,
  isSpam,
  readEnquiry,
  validateEnquiry,
  type FieldErrors,
} from "@/lib/enquiry";

/**
 * Sends a contact form enquiry to the studio's inbox, through Resend.
 *
 * Runs on the server only, so the API key never reaches the browser. The form
 * in components/ContactDialog.tsx calls it through useActionState, which is
 * why it takes the previous state first and returns the next one. Problems a
 * visitor can fix come back as values rather than thrown errors, so the form
 * can show them in place.
 *
 * Configured in .env.local (see .env.example):
 *   RESEND_API_KEY     from resend.com → API Keys
 *   CONTACT_TO_EMAIL   the inbox enquiries go to
 *   CONTACT_FROM_EMAIL the sender; must be on a domain verified in Resend
 */

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
};

/** Resend's shared test sender, usable before a domain is verified. */
const DEFAULT_FROM = "Sri Atelier Website <onboarding@resend.dev>";

const FAILED =
  "Sorry, your enquiry couldn't be sent just now. Please try again, or email or WhatsApp us directly.";

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Pretend it worked, so a bot gets no signal to try a different approach.
  if (isSpam(formData)) return { status: "success" };

  const enquiry = readEnquiry(formData);
  const fieldErrors = validateEnquiry(enquiry);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local");
    return { status: "error", message: FAILED };
  }

  const { subject, html, text } = buildEnquiryEmail(enquiry);
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    to,
    // Pressing Reply in the inbox answers the visitor, not the website.
    replyTo: enquiry.email,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("Contact form: Resend rejected the email", error);
    return { status: "error", message: FAILED };
  }

  return { status: "success" };
}
