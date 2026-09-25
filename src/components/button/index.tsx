import { ButtonProps } from "./type";
import styles from "./button.module.css";

const Button = ({ label, type, onClick, disabled, variant = "primary", size = "medium", ...props }: ButtonProps) => {
  const buttonClassName = [styles.button, styles[variant], styles[size]].join(" ");

  return (
    <button type={type} className={buttonClassName} onClick={onClick} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default Button;
