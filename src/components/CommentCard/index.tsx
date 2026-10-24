import Image from "next/image";
import styles from "./styles.module.css";
import type { CommentCardProps } from "./type";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

const DEFAULT_AVATAR_URL = "/default_user_icon.png";

const CommentCard = ({ userName, userAvatarUrl, content, createdAt }: CommentCardProps) => {
  return (
    <article className={styles.card}>
      <Image
        className={styles.avatar}
        src={userAvatarUrl || DEFAULT_AVATAR_URL}
        alt={`${userName}のアイコン`}
        width={40}
        height={40}
        unoptimized
      />
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.userName}>{userName}</span>
          <time className={styles.createdAt} dateTime={createdAt}>
            {formatRelativeTime(createdAt)}
          </time>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
