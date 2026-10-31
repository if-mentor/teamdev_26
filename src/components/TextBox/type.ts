import type { TextareaHTMLAttributes } from "react";

export interface TextBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}
