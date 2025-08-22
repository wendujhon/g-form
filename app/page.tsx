"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const router = useRouter();
  const [title] = React.useState("Job Application");
  const [description] = React.useState(
    "Please complete the application below. Fields marked Required must be filled."
  );

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [position, setPosition] = React.useState<string>("");
  const [years, setYears] = React.useState<number | "">("");
  const [startDate, setStartDate] = React.useState("");
  const [coverLetter, setCoverLetter] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required";
    if (!email.trim()) next.email = "Email is required";
    if (!position.trim()) next.position = "Position is required";
    if (years === "" || Number.isNaN(Number(years)))
      next.years = "Enter years of experience";
    if (!startDate) next.startDate = "Start date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit() {
    if (!validate()) return;
    try {
      setSubmitting(true);
      setMessage(null);
      const payload = {
        form: { title, description },
        answers: {
          fullName,
          email,
          phone,
          position,
          years: Number(years),
          startDate,
          coverLetter,
        },
      };
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok)
        throw new Error(json.error || "Failed to submit");
      setMessage("Application submitted successfully.");
      router.push("/submitted");
    } catch (err: any) {
      setMessage(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-secondary py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="border-t-8 border-t-primary overflow-hidden">
          <div className="relative h-40 w-full">
            <Image
              src="/job-banner.svg"
              alt="Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label className="text-base">
                Full name <span className="text-red-600">*</span>
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <div className="text-xs text-red-600">{errors.fullName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Email <span className="text-red-600">*</span>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <div className="text-xs text-red-600">{errors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base">Phone number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Position applying for <span className="text-red-600">*</span>
              </Label>
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                aria-invalid={!!errors.position}
              />
              {errors.position && (
                <div className="text-xs text-red-600">{errors.position}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Years of experience <span className="text-red-600">*</span>
              </Label>
              <Input
                type="number"
                min={0}
                max={50}
                value={years as any}
                onChange={(e) =>
                  setYears(e.target.value === "" ? "" : Number(e.target.value))
                }
                aria-invalid={!!errors.years}
              />
              {errors.years && (
                <div className="text-xs text-red-600">{errors.years}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Available start date <span className="text-red-600">*</span>
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-invalid={!!errors.startDate}
              />
              {errors.startDate && (
                <div className="text-xs text-red-600">{errors.startDate}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base">Cover letter</Label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>

            <Separator className="h-px w-full bg-border" />

            <div className="flex items-center justify-between">
              {message && (
                <div className="text-sm text-muted-foreground">{message}</div>
              )}
              <div className="flex gap-3">
                <Button onClick={onSubmit} disabled={submitting} type="button">
                  {submitting ? "Submitting..." : "Submit application"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
