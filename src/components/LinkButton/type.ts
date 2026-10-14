import type { ComponentProps } from "react";
import type Link from "next/link";

export type LinkButtonProps = Omit<ComponentProps<typeof Link>, "children" | "type"> & {
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "medium" | "large";
};
