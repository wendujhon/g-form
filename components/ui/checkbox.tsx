import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  id: string;
  label: string;
}

export interface CheckboxGroupProps {
  name: string;
  values?: string[];
  onChange?: (values: string[]) => void;
  options: CheckboxOption[];
  className?: string;
}

export function CheckboxGroup({
  name,
  values = [],
  onChange,
  options,
  className,
}: CheckboxGroupProps) {
  function toggle(id: string) {
    const set = new Set(values);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange?.(Array.from(set));
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {options.map((opt) => (
        <label key={opt.id} className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            name={name}
            value={opt.id}
            checked={values.includes(opt.id)}
            onChange={() => toggle(opt.id)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
