"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export interface ToolbarProps {
  onAddQuestion: () => void;
}

export function Toolbar({ onAddQuestion }: ToolbarProps) {
  return (
    <div className="fixed right-6 top-1/3 z-20 flex flex-col items-center gap-3">
      <Button onClick={onAddQuestion}>+ Add question</Button>
    </div>
  );
}
