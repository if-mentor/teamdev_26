import styles from "./styles.module.css";
import type { TextBoxProps } from "./type";

const TextBox = ({ error, ...props }: TextBoxProps) => {
  return (
    <div className={styles.textBoxWrap}>
      <textarea {...props} className={`${styles.textBox} ${error ? styles.error : ""}`} />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default TextBox;
