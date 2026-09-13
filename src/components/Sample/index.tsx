import styles from "./styles.module.css";
import type { Person } from "./type";

const Sample = () => {
  const person: Person = {
    name: "John Doe",
    age: 20,
  };

  return (
    <>
      <p className={styles.sample}>Name:{person.name}</p>
      <p className={styles.sample}>Age:{person.age}</p>
    </>
  );
};

export default Sample;
