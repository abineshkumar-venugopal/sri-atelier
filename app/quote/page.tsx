import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import MinimalFooter from "@/components/MinimalFooter";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell FORMA about your interior, exterior, or construction project and get a response within one business day.",
};

export default function QuotePage() {
  return (
    <>
      <div className="quote-page">
        <div className="quote-header">
          <p className="section-label">Start a Project</p>
          <h1 className="quote-title">
            Get a
            <br />
            <em>Quote</em>
          </h1>
          <p className="quote-sub">
            Tell us about your vision and we&apos;ll be in touch within 24 hours.
          </p>
        </div>
        <QuoteForm />
      </div>
      <MinimalFooter />
    </>
  );
}
