"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <label
      className={cn("relative inline-flex h-6 w-11 items-center", className)}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="absolute inset-0 rounded-full bg-input transition peer-checked:bg-primary" />
      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background transition peer-checked:translate-x-5" />
    </label>
  );
}
