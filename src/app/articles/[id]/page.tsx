import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import CommentForm from "@/components/CommentForm";
import dummyImage from "../../../../public/sample1.jpg";
import dummyAuthorIcon from "../../../../public/default_user_icon.png";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import CommentList from "@/components/CommentList";

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

type ArticleDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const { id } = await params;

  return (
    <>
      <main className={styles.content}>
        <div className={styles.inner}>
          <article className={styles.article}>
            <div className={styles.header}>
              <h1 className={styles.articleTitle}>{dummyArticle.title}</h1>
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
              <Link href={`/articles/${id}/edit`} className={styles.editButton}>
                編集
              </Link>
            </div>
          </article>

          <section className={styles.commentSection}>
            <CommentList
              postId={id}
              classNames={{
                title: styles.commentTitle,
                num: styles.num,
                cardWrap: styles.commentCardWrap,
              }}
            >
              <div className={styles.commentFormWrap}>
                <CommentForm />
              </div>
            </CommentList>
          </section>
        </div>
      </main>
    </>
  );
};

export default ArticleDetailPage;
