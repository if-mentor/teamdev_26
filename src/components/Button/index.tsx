import styles from "./button.module.css";
import { ButtonProps } from "./type";

const Button = ({ label, type, onClick, disabled, variant = "primary", size = "medium", ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
