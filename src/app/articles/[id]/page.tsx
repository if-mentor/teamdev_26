import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";
import { prisma } from "@/libs/prisma";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

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
            <h2 className={styles.commentTitle}>
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
