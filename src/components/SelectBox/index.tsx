import styles from "./styles.module.css";
import type { SelectBoxProps } from "./type";

const SelectBox = ({ options, label, placeholder, ...props }: SelectBoxProps) => {
  return (
    <>
      <div className={styles.selectBoxContainer}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.selectBoxWrapper}>
          <select className={styles.selectBox} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => {
              return (
                <option key={option.id} value={option.id} className={styles.option}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectBox;
