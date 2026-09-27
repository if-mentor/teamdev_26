import type { SelectHTMLAttributes } from "react";

export interface Option {
  id: number;
  value: string;
}

export interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
}
