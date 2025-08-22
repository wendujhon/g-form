"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { Question, QuestionOption, QuestionType } from "@/lib/formTypes";
import { cn } from "@/lib/utils";

export interface QuestionCardProps {
  question: Question;
  index: number;
  onChange: (q: Question) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  className?: string;
}

const TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: "short_answer", label: "Short answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "multiple_choice", label: "Multiple choice" },
  { value: "checkboxes", label: "Checkboxes" },
  { value: "dropdown", label: "Dropdown" },
  { value: "linear_scale", label: "Linear scale" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
];

export function QuestionCard({
  question,
  index,
  onChange,
  onDuplicate,
  onDelete,
  className,
}: QuestionCardProps) {
  function set<K extends keyof Question>(key: K, value: Question[K]) {
    onChange({ ...question, [key]: value });
  }

  function updateOption(id: string, label: string) {
    const options = (question.options ?? []).map((o) =>
      o.id === id ? { ...o, label } : o
    );
    set("options", options);
  }

  function addOption() {
    const options = [
      ...(question.options ?? []),
      {
        id: crypto.randomUUID(),
        label: `Option ${(question.options?.length ?? 0) + 1}`,
      },
    ];
    set("options", options);
  }

  function removeOption(id: string) {
    const options = (question.options ?? []).filter((o) => o.id !== id);
    set("options", options);
  }

  return (
    <Card className={cn("border-l-4 border-l-primary", className)}>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_200px]">
          <Input
            value={question.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Untitled question"
            className="text-base"
          />
          <Select
            value={question.type}
            onChange={(e) => set("type", e.target.value as QuestionType)}
            className="md:justify-self-end"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {question.description !== undefined && (
          <Textarea
            value={question.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Description (optional)"
          />
        )}

        {/* Render by type */}
        <div>
          {question.type === "short_answer" && (
            <Input disabled placeholder="Short answer text" />
          )}
          {question.type === "paragraph" && (
            <Textarea disabled placeholder="Long answer text" />
          )}
          {question.type === "multiple_choice" && (
            <div className="space-y-2">
              {(question.options ?? []).map((opt) => (
                <div key={opt.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    disabled
                    className="h-4 w-4 accent-primary"
                  />
                  <Input
                    value={opt.label}
                    onChange={(e) => updateOption(opt.id, e.target.value)}
                    className="w-full"
                  />
                  <Button variant="ghost" onClick={() => removeOption(opt.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="link" onClick={addOption}>
                Add option
              </Button>
            </div>
          )}
          {question.type === "checkboxes" && (
            <div className="space-y-2">
              {(question.options ?? []).map((opt) => (
                <div key={opt.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    disabled
                    className="h-4 w-4 accent-primary"
                  />
                  <Input
                    value={opt.label}
                    onChange={(e) => updateOption(opt.id, e.target.value)}
                    className="w-full"
                  />
                  <Button variant="ghost" onClick={() => removeOption(opt.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="link" onClick={addOption}>
                Add option
              </Button>
            </div>
          )}
          {question.type === "dropdown" && (
            <div className="space-y-2">
              {(question.options ?? []).map((opt) => (
                <div key={opt.id} className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">▪</div>
                  <Input
                    value={opt.label}
                    onChange={(e) => updateOption(opt.id, e.target.value)}
                    className="w-full"
                  />
                  <Button variant="ghost" onClick={() => removeOption(opt.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="link" onClick={addOption}>
                Add option
              </Button>
            </div>
          )}
          {question.type === "linear_scale" && (
            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <Input
                type="number"
                min={0}
                max={question.linearScale?.max ?? 5}
                value={question.linearScale?.min ?? 1}
                onChange={(e) =>
                  set("linearScale", {
                    ...(question.linearScale ?? { min: 1, max: 5 }),
                    min: Number(e.target.value),
                  })
                }
              />
              <div className="text-center text-sm text-muted-foreground">
                to
              </div>
              <Input
                type="number"
                min={question.linearScale?.min ?? 1}
                max={10}
                value={question.linearScale?.max ?? 5}
                onChange={(e) =>
                  set("linearScale", {
                    ...(question.linearScale ?? { min: 1, max: 5 }),
                    max: Number(e.target.value),
                  })
                }
              />
              <div className="md:col-span-3 grid grid-cols-2 gap-3">
                <Input
                  placeholder="Left label (optional)"
                  value={question.linearScale?.leftLabel ?? ""}
                  onChange={(e) =>
                    set("linearScale", {
                      ...(question.linearScale ?? { min: 1, max: 5 }),
                      leftLabel: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Right label (optional)"
                  value={question.linearScale?.rightLabel ?? ""}
                  onChange={(e) =>
                    set("linearScale", {
                      ...(question.linearScale ?? { min: 1, max: 5 }),
                      rightLabel: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          {question.type === "date" && <Input type="date" disabled />}
          {question.type === "time" && <Input type="time" disabled />}
        </div>

        <Separator className="h-px w-full bg-border" />

        <div className="flex items-center justify-end gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Required</Label>
            <Switch
              checked={question.required}
              onChange={(e) =>
                set("required", (e.target as HTMLInputElement).checked)
              }
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onDuplicate}>
              Duplicate
            </Button>
            <Button variant="secondary" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
