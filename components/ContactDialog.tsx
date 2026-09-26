"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useActionState,
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type FormEvent,
} from "react";
import { Slot } from "radix-ui";
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  XIcon,
} from "lucide-react";

import { sendEnquiry, type EnquiryState } from "@/app/actions/contact";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services, studio } from "@/lib/data";
import { HONEYPOT_FIELD, type EnquiryField } from "@/lib/enquiry";

/*
 * The site's contact form lives in one dialog, opened from anywhere:
 *
 *   <ContactTrigger><Button>Contact</Button></ContactTrigger>
 *
 * ContactProvider sits in the root layout and owns the single dialog.
 * Linking to #contact opens it too, which is where the old /contact page now
 * redirects (see next.config.ts).
 */

const ContactContext = createContext<{ openContact: () => void } | null>(null);

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContact must be used inside <ContactProvider>");
  return context;
}

/**
 * Makes its child open the contact dialog. Forwards any props it is given, so
 * it still works inside another asChild wrapper such as the mobile menu's
 * SheetClose.
 */
export function ContactTrigger({
  onClick,
  ...props
}: ComponentProps<typeof Slot.Root>) {
  const { openContact } = useContact();
  return (
    <Slot.Root
      {...props}
      onClick={(event) => {
        onClick?.(event);
        openContact();
      }}
    />
  );
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  // Each opening gets a fresh form, so a previous "sent" state never lingers.
  const [session, setSession] = useState(0);

  const openContact = useCallback(() => {
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  // #contact in the address bar opens it, on arrival and on later changes.
  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#contact") openContact();
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [openContact]);

  const onOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    // Drop the hash on close, so a refresh does not reopen it.
    if (!next && window.location.hash === "#contact") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactDialog key={session} open={open} onOpenChange={onOpenChange} />
    </ContactContext.Provider>
  );
}

function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, formAction] = useActionState<EnquiryState, FormData>(sendEnquiry, {
    status: "idle",
  });
  const [pending, startTransition] = useTransition();
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  /**
   * Sends the form to the sendEnquiry server action (app/actions/contact.ts),
   * which emails it to the studio.
   *
   * Submitted by hand rather than with <form action={formAction}>: a form
   * action clears every field once it finishes, and when the server sends back
   * a correction the visitor should not have to type the enquiry again.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };

  /** Props that mark a field invalid and point it at its message. */
  const errorProps = (field: EnquiryField) =>
    state.fieldErrors?.[field]
      ? { "aria-invalid": true, "aria-describedby": `contact-${field}-error` }
      : {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        showCloseButton={false}
        // Straight into the form on a desktop. On a phone that would throw the
        // keyboard up over the dialog, so focus holds on the dialog instead.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          if (window.matchMedia("(min-width: 768px)").matches) nameRef.current?.focus();
          else contentRef.current?.focus();
        }}
        // sm:max-w-5xl has to be stated: the base class caps it at sm:max-w-sm,
        // and cn() cannot merge a prefixed class away with an unprefixed one.
        className="max-h-[92vh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto bg-paper p-0 ring-0 sm:max-w-5xl md:grid-cols-[0.9fr_1.1fr]"
      >
        <DialogClose
          aria-label="Close"
          className="absolute top-4 right-4 z-[1] grid size-10 place-items-center rounded-full border border-fog bg-paper text-ash transition-all duration-400 ease-forma outline-none hover:border-terracotta hover:bg-terracotta hover:text-paper focus-visible:ring-2 focus-visible:ring-ring md:top-6 md:right-6"
        >
          <XIcon className="size-4" strokeWidth={1.5} />
        </DialogClose>

        {/* Studio details */}
        <aside className="flex flex-col gap-10 bg-stone px-7 py-10 md:px-10 md:py-12">
          <div>
            <p className="mb-4 text-eyebrow uppercase tracking-[0.25em] text-bronze">
              Get in touch
            </p>
            <DialogTitle className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-light leading-[1.1] text-ink">
              Let&apos;s build something{" "}
              <em className="italic text-terracotta">meaningful</em>
            </DialogTitle>
            <DialogDescription className="mt-4 text-[0.9rem] leading-[1.8] text-ash">
              Tell us about the site, the brief and the timeline. We reply to
              every enquiry within one working day.
            </DialogDescription>
          </div>

          <ul className="space-y-5 text-[0.9rem] leading-[1.7] text-ink">
            <Detail icon={MailIcon}>
              <a href={`mailto:${studio.email}`} className="transition-colors hover:text-terracotta">
                {studio.email}
              </a>
            </Detail>
            <Detail icon={PhoneIcon}>
              <a href={studio.phoneHref} className="transition-colors hover:text-terracotta">
                {studio.phone}
              </a>
            </Detail>
            <Detail icon={MessageCircleIcon}>
              <a
                href={studio.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-terracotta"
              >
                Chat on WhatsApp
              </a>
            </Detail>
            <Detail icon={MapPinIcon}>
              {studio.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Detail>
            <Detail icon={ClockIcon}>{studio.hours}</Detail>
          </ul>

          <div className="mt-auto border-t border-fog pt-6">
            <p className="mb-4 text-eyebrow uppercase tracking-[0.25em] text-ash">
              Follow the studio
            </p>
            <SocialLinks />
          </div>
        </aside>

        {/* Form */}
        <div className="px-7 py-10 md:px-12 md:py-12">
          {state.status === "success" ? (
            <div className="flex h-full min-h-80 flex-col justify-center">
              <span className="mb-7 grid size-12 place-items-center rounded-full bg-terracotta text-paper">
                <CheckIcon className="size-5" strokeWidth={1.5} />
              </span>
              <h3 className="mb-4 font-display text-[2rem] font-light leading-[1.15] text-ink">
                Thank you, your enquiry is with us
              </h3>
              <p className="max-w-sm text-[0.9rem] leading-[1.8] text-ash">
                Someone from the studio will reply to the email you gave within
                one working day. If it&apos;s urgent, call us on{" "}
                <a href={studio.phoneHref} className="text-terracotta underline-offset-4 hover:underline">
                  {studio.phone}
                </a>
                .
              </p>
              <DialogClose asChild>
                <Button variant="bordered" className="mt-9 w-fit rounded-full px-8">
                  Close
                </Button>
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-7">
              <p className="text-eyebrow uppercase tracking-[0.25em] text-ash">
                Start a project
              </p>

              {/* Spam trap: hidden from people and screen readers, but bots fill it in. */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name">Full name</Label>
                  <Input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    {...errorProps("name")}
                  />
                  <FieldError id="contact-name-error" message={state.fieldErrors?.name} />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    {...errorProps("email")}
                  />
                  <FieldError id="contact-email-error" message={state.fieldErrors?.email} />
                </div>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contact-phone">
                    Phone <span className="normal-case tracking-normal text-ash/70">(optional)</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 00000 00000"
                    {...errorProps("phone")}
                  />
                  <FieldError id="contact-phone-error" message={state.fieldErrors?.phone} />
                </div>
                <div>
                  <Label htmlFor="contact-service">Project type</Label>
                  <Select name="service">
                    <SelectTrigger id="contact-service" {...errorProps("service")}>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    {/* Above the dialog: the default z-50 would open behind it. */}
                    <SelectContent className="z-[2100]">
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Something else">Something else</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError id="contact-service-error" message={state.fieldErrors?.service} />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-message">Project details</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  className="h-32"
                  placeholder="The site, the brief, the timeline…"
                  {...errorProps("message")}
                />
                <FieldError id="contact-message-error" message={state.fieldErrors?.message} />
              </div>

              {state.status === "error" && state.message && (
                <p role="alert" className="border-l-2 border-destructive bg-mist px-4 py-3 text-[0.85rem] leading-[1.7] text-ink">
                  {state.message}
                  {/* Sending failed outright: offer the other ways in. */}
                  {!state.fieldErrors && (
                    <>
                      {" "}
                      <a href={`mailto:${studio.email}`} className="text-terracotta underline-offset-4 hover:underline">
                        {studio.email}
                      </a>
                      {" · "}
                      <a
                        href={studio.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta underline-offset-4 hover:underline"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                </p>
              )}

              <div className="flex flex-col gap-5 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.8rem] text-ash">We reply within one working day.</p>
                <Button
                  type="submit"
                  variant="dark"
                  disabled={pending}
                  aria-busy={pending}
                  className="rounded-full px-9"
                >
                  {pending ? "Sending…" : "Send enquiry →"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8rem] text-destructive">
      {message}
    </p>
  );
}

function Detail({
  icon: Icon,
  children,
}: {
  icon: typeof MailIcon;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3.5">
      <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-terracotta" strokeWidth={1.5} />
      <div>{children}</div>
    </li>
  );
}
