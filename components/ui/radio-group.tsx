"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupOption {
  id: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  className,
}: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {options.map((opt) => (
        <label key={opt.id} className="inline-flex items-center gap-3">
          <input
            type="radio"
            name={name}
            value={opt.id}
            checked={value === opt.id}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
