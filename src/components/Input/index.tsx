import styles from "./styles.module.css";
import type { InputProps } from "./type";

const Input = ({ label, error, variantSize = "medium", className = "", ...props }: InputProps) => {
  <input
    {...props}
    className={`
    ${styles.input}
    ${styles[variantSize]}
    ${error ? styles.inputError : ""}
    ${className}
  `}
  />;
  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <input
        {...props}
        className={`
    ${styles.input}
    ${styles[variantSize]}
    ${error ? styles.inputError : ""}
    ${className}
  `}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};

export default Input;
