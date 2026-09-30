import styles from "./styles.module.css";
import type { CardProps } from "./type";
import Image from "next/image";

const Card = ({ title, author, category, imageUrl, content, createdAt }: CardProps) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let relativeTime = "";

  if (diffMinutes < 60) {
    relativeTime = `${diffMinutes}分前`;
  } else if (diffHours < 24) {
    relativeTime = `${diffHours}時間前`;
  } else {
    relativeTime = `${diffDays}日前`;
  }

  return (
    <article className={styles.card}>
      <Image src={imageUrl} alt={title} width={280} height={180} className={styles.image} />
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.category}>{category}</p>
      </div>

      <p className={styles.author}>{author}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.createdAt}>{relativeTime}</p>
    </article>
  );
};
export default Card;
