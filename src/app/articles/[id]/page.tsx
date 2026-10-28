import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import CommentForm from "@/components/CommentForm";
import { prisma } from "@/libs/prisma";

import { formatRelativeTime } from "@/utils/formatRelativeTime";
import CommentList from "@/components/CommentList";

type ArticleDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const { id } = await params;

  const article = await prisma.post.findUnique({
    where: {
      id: BigInt(id),
    },
    include: {
      user: true,
      category: true,
    },
  });

  if (!article) {
    return <p>記事が見つかりませんでした。</p>;
  }

  return (
    <>
      <main className={styles.content}>
        <div className={styles.inner}>
          <article className={styles.article}>
            <div className={styles.header}>
              <h1 className={styles.articleTitle}>{article.title}</h1>
              <div className={styles.author}>
                <span className={styles.authorName}>{article.user.name}</span>
                <div className={styles.authorIcon}>
                  <Image
                    src={article.user.imagePath || "/default_user_icon.png"}
                    alt={`${article.user.name || "ユーザー"}のアイコン`}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
            {article.imagePath && (
              <div className={styles.image}>
                <Image src={article.imagePath} alt={article.title || "記事のメイン画像"} width={800} height={450} />
              </div>
            )}
            <div className={styles.body}>
              <p className={styles.category}>{article.category.name}</p>
              <p className={styles.text}>{article.content}</p>
            </div>
            <div className={styles.footer}>
              <time className={styles.createdAt} dateTime={article.createdAt.toISOString()}>
                {formatRelativeTime(article.createdAt.toDateString())}
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
