import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTypes = [
  "Interior Design",
  "Exterior Design",
  "Construction",
  "Full Project",
];

const budgetRanges = [
  "Under ₹25 Lakhs",
  "₹25 – ₹75 Lakhs",
  "₹75 Lakhs – ₹2 Crore",
  "₹2 Crore+",
];

export default function QuoteForm() {
  return (
    <div className="w-full max-w-150 bg-paper p-8 md:p-15">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Label htmlFor="quote-name">Full Name</Label>
          <Input id="quote-name" type="text" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="quote-phone">Phone</Label>
          <Input id="quote-phone" type="tel" placeholder="+91 00000 00000" />
        </div>
      </div>

      <div className="mt-8">
        <Label htmlFor="quote-email">Email Address</Label>
        <Input id="quote-email" type="email" placeholder="you@email.com" />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <Label>Project Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Budget Range</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8">
        <Label htmlFor="quote-details">Project Details</Label>
        <Textarea
          id="quote-details"
          className="h-37.5"
          placeholder="Describe your space, timeline, and any specific requirements…"
        />
      </div>

      <div className="mt-10 text-center">
        <Button variant="dark" size="lg">
          Request Quote
        </Button>
        <p className="mt-7 text-[0.78rem] tracking-[0.05em] text-ash">
          We respond to all enquiries within one business day.
        </p>
      </div>
    </div>
  );
}
