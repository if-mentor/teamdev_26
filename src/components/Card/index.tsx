import styles from "./styles.module.css";
import type { CardProps } from "./type";
import Image from "next/image";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

const Card = ({ title, author, category, imageUrl, content, createdAt }: CardProps) => {
  const relativeTime = formatRelativeTime(createdAt);

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
