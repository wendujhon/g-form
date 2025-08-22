"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubmittedPage() {
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
            <CardTitle>Thank you</CardTitle>
            <CardDescription>Your response has been recorded.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                You can close this tab, or submit another response.
              </div>
              <Button asChild>
                <Link href="/">Submit another response</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
