import Image from "next/image";
import styles from "./styles.module.css";

import Button from "@/components/Button";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";

import dummyImage from "../../../../public/articles/dummy_image.jpg";
import dummyAuthorIcon from "../../../../public/articles/dummy_author_icon.png";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const formatRelativeTime = (dateString: string, now: Date = new Date()) => {
  const target = new Date(dateString);
  const diff = now.getTime() - target.getTime();

  if (diff < MINUTE) return "just now";

  const minutes = Math.floor(diff / MINUTE);

  if (minutes === 1) return "a min ago";
  if (diff < HOUR) return `${minutes} mins ago`;

  const hours = Math.floor(diff / HOUR);

  if (hours === 1) return "an hour ago";
  if (diff < DAY) return `${hours} hours ago`;

  const days = Math.floor(diff / DAY);

  if (days === 1) return "a day ago";
  if (diff < WEEK) return `${days} days ago`;

  return target.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  });
};

const dummyArticle = {
  id: 1,
  title: "Blog Title",
  author: "Author",
  authorIcon: dummyAuthorIcon,
  authorIconAlt: "Aさん",
  image: dummyImage,
  imageAlt: "メイン画像",
  category: "Category",
  content:
    "テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります",
  createdAt: "2026-10-01T20:37:00+09:00",
};

const dummyComments = [
  {
    id: 1,
    userName: "ユーザー名",
    createdAt: "2026-09-30T16:00:00+09:00",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
  },
  {
    id: 2,
    userName: "ユーザー名",
    createdAt: "2026-09-30T16:00:00+09:00",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
  },
];

const ArticleDetailPage = () => {
  return (
    <>
      <main className={styles.content}>
        <div className={styles.inner}>
          <article className={styles.article}>
            <div className={styles.header}>
              <h1 className={styles.articleTtl}>{dummyArticle.title}</h1>
              <div className={styles.author}>
                <span className={styles.authorName}>{dummyArticle.author}</span>
                <div className={styles.authorIcon}>
                  <Image src={dummyArticle.authorIcon} alt={dummyArticle.authorIconAlt} />
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <Image src={dummyArticle.image} alt={dummyArticle.imageAlt} />
            </div>
            <div className={styles.body}>
              <p className={styles.category}>{dummyArticle.category}</p>
              <p className={styles.text}>{dummyArticle.content}</p>
            </div>
            <div className={styles.footer}>
              <time className={styles.createdAt} dateTime={dummyArticle.createdAt}>
                {formatRelativeTime(dummyArticle.createdAt)}
              </time>
              <Button label="編集" />
            </div>
          </article>

          <section className={styles.commentSection}>
            <h2 className={styles.commentTtl}>
              <span className={styles.num}>{dummyComments.length}</span>件のコメント
            </h2>
            <div className={styles.commentFormWrap}>
              <CommentForm />
            </div>
            <div className={styles.commentCardWrap}>
              {dummyComments.map((comment) => (
                <CommentCard key={comment.id} {...comment} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
