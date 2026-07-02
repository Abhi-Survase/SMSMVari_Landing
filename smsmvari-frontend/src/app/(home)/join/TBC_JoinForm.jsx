// app/(home)/join/JoinForm.jsx
// ─── Client component — keeps "use client" isolated so page.jsx can export metadata
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const INTEREST_AREAS = [
  { value: "tribal_camps", label: "Tribal Health Camps (Devbandh)" },
  { value: "disaster_relief", label: "Disaster & Emergency Relief" },
  { value: "school_programmes", label: "School Health Programmes" },
  { value: "aarogyawari", label: "Aarogyawari (Pandharpur Wari)" },
  { value: "general", label: "Wherever I'm Needed Most" },
];

export default function JoinForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interestArea: "",
    profession: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      // TODO: wire up to your real volunteer-signup endpoint
      const res = await fetch(`${BASE_URL}/api/v1/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        interestArea: "",
        profession: "",
        message: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "success" && (
        <Alert className="border-green-500 text-green-700 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Thank you for stepping forward! We will reach out within 2 business
            days.
          </AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. Please try again or call us directly.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Suresh Patil"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profession">Profession (optional)</Label>
          <Input
            id="profession"
            name="profession"
            placeholder="Doctor, Nurse, Student, etc."
            value={form.profession}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interestArea">Where Would You Like to Help?</Label>
        <select
          id="interestArea"
          name="interestArea"
          required
          value={form.interestArea}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="" disabled>
            Select an area of interest
          </option>
          {INTEREST_AREAS.map((area) => (
            <option key={area.value} value={area.value}>
              {area.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell Us About Yourself (optional)</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Skills, availability, past volunteering experience — anything that helps us place you well."
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="uppercase font-bold tracking-wide border-b-4 border-b-secondary/50 active:border-b-0 active:translate-y-1"
      >
        <Send size={16} className="mr-2" />
        {loading ? "Submitting…" : "Join the Mission"}
      </Button>
    </form>
  );
}
