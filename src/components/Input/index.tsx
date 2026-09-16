import styles from "./styles.module.css";
import type { InputProps } from "./type";

const Input = ({ label, error, variantSize = "medium", className = "", ...props }: InputProps) => {
  const inputClassName = [styles.input, styles[variantSize], error ? styles.inputError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <input {...props} className={inputClassName} />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};

export default Input;
