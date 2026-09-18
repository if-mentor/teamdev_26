import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "medium" | "large";
}
