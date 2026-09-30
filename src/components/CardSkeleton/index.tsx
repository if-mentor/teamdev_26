import styles from "./styles.module.css";

const CardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={` ${styles.image} ${styles.skeleton}`}></div>
      <div className={styles.titleRow}>
        <div className={` ${styles.title} ${styles.skeleton}`}></div>
        <div className={` ${styles.category} ${styles.skeleton}`}></div>
      </div>

      <div className={` ${styles.author} ${styles.skeleton}`}></div>
      <div className={` ${styles.content} ${styles.skeleton}`}></div>
      <div className={` ${styles.content} ${styles.skeleton}`}></div>
      <div className={` ${styles.createdAt} ${styles.skeleton}`}></div>
    </article>
  );
};

export default CardSkeleton;
