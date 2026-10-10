"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { LinkButtonProps } from "./type";

const LinkButton = ({ label, disabled, variant = "success", size = "medium", onClick, ...props }: LinkButtonProps) => {
  return (
    <Link
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${disabled ? styles.disabled : ""}
      `}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
