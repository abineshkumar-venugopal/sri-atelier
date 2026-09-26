/**
 * Contact form enquiries: reading one from a submitted form, checking it, and
 * turning it into the email the studio receives.
 *
 * Deliberately free of framework and network code, so the rules can be read —
 * and tested — on their own. Sending lives in app/actions/contact.ts.
 */

export type EnquiryField = "name" | "email" | "phone" | "service" | "message";
export type Enquiry = Record<EnquiryField, string>;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

/** Generous limits, there to stop abuse rather than to constrain people. */
const LIMITS: Record<EnquiryField, number> = {
  name: 120,
  email: 200,
  phone: 40,
  service: 80,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A field real visitors never see. Bots tend to fill in every input they find,
 * so anything in here marks the submission as spam.
 */
export const HONEYPOT_FIELD = "company";

export function isSpam(formData: FormData) {
  return String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "";
}

export function readEnquiry(formData: FormData): Enquiry {
  const get = (field: EnquiryField) => String(formData.get(field) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    service: get("service"),
    message: get("message"),
  };
}

/**
 * Checked on the server as well as in the browser: the browser's `required`
 * and `type="email"` are a convenience, and can be bypassed.
 */
export function validateEnquiry(enquiry: Enquiry): FieldErrors {
  const errors: FieldErrors = {};

  if (!enquiry.name) errors.name = "Please tell us your name.";
  if (!enquiry.email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(enquiry.email)) {
    errors.email = "That email address doesn't look right.";
  }
  if (!enquiry.message) errors.message = "Tell us a little about the project.";

  for (const field of Object.keys(LIMITS) as EnquiryField[]) {
    if (!errors[field] && enquiry[field].length > LIMITS[field]) {
      errors[field] = `Please keep this under ${LIMITS[field]} characters.`;
    }
  }

  return errors;
}

/** Visitor text goes into HTML, so it is escaped rather than trusted. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** The notification the studio receives, as both plain text and HTML. */
export function buildEnquiryEmail(enquiry: Enquiry) {
  const name = enquiry.name.replace(/\s+/g, " ");
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "—"],
    ["Project type", enquiry.service || "—"],
  ];

  const subject = `New enquiry from ${name}`;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    enquiry.message,
    "",
    "— Sent from the website contact form. Reply to this email to answer them directly.",
  ].join("\n");

  const html = `
<div style="font-family:Helvetica,Arial,sans-serif;color:#2a2622;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
  <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7e6245">New website enquiry</p>
  <h1 style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.2">${escapeHtml(name)}</h1>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([label, value]) => `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #eae5dd;color:#645b52;width:130px;vertical-align:top">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eae5dd">${escapeHtml(value)}</td>
    </tr>`
      )
      .join("")}
  </table>
  <p style="margin:28px 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7e6245">Message</p>
  <div style="font-size:15px;line-height:1.7;white-space:pre-wrap;padding:18px 20px;background:#f5f2ec">${escapeHtml(enquiry.message)}</div>
  <p style="margin:28px 0 0;font-size:12px;color:#645b52">Reply to this email to answer ${escapeHtml(name)} directly.</p>
</div>`.trim();

  return { subject, text, html };
}
