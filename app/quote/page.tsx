import type { Metadata } from "next";

import QuoteForm from "@/components/QuoteForm";
import MinimalFooter from "@/components/MinimalFooter";
import { eyebrowClass } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell FORMA about your interior, exterior, or construction project and get a response within one business day.",
};

export default function QuotePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-mist px-6 pt-40 pb-25 md:px-15">
        <div className="mb-18 text-center">
          <p className={eyebrowClass}>Start a Project</p>
          <h1 className="mb-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1]">
            Get a
            <br />
            <em className="italic text-brass">Quote</em>
          </h1>
          <p className="text-[0.9rem] text-ash">
            Tell us about your vision and we&apos;ll be in touch within 24 hours.
          </p>
        </div>
        <QuoteForm />
      </div>
      <MinimalFooter />
    </>
  );
}
