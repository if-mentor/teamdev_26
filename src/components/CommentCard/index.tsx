import Image from "next/image";
import styles from "./styles.module.css";
import type { CommentCardProps } from "./type";

const DEFAULT_AVATAR_URL = "/default_user_icon.png";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const formatRelativeTime = (dateString: string, now: Date = new Date()) => {
  const target = new Date(dateString);
  const diff = now.getTime() - target.getTime();

  if (diff < MINUTE) return "たった今";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}分前`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}時間前`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)}日前`;

  return target.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  });
};

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
