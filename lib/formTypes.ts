export type QuestionType =
  | "short_answer"
  | "paragraph"
  | "multiple_choice"
  | "checkboxes"
  | "dropdown"
  | "linear_scale"
  | "date"
  | "time"
  | "password";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  type: QuestionType;
  options?: QuestionOption[];
  linearScale?: {
    min: number;
    max: number;
    leftLabel?: string;
    rightLabel?: string;
  };
}

export function createDefaultQuestion(
  id: string,
  type: QuestionType = "multiple_choice"
): Question {
  if (
    type === "short_answer" ||
    type === "paragraph" ||
    type === "date" ||
    type === "time" ||
    type === "password"
  ) {
    return { id, title: "Untitled question", required: false, type };
  }
  if (type === "linear_scale") {
    return {
      id,
      title: "Untitled question",
      required: false,
      type,
      linearScale: { min: 1, max: 5 },
    };
  }
  // choice based
  return {
    id,
    title: "Untitled question",
    required: false,
    type,
    options: [
      { id: crypto.randomUUID(), label: "Option 1" },
      { id: crypto.randomUUID(), label: "Option 2" },
    ],
  };
}
