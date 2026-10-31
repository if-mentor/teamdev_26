import styles from "./styles.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { Suspense } from "react";

import { prisma } from "@/libs/prisma";
import { supabase } from "@/libs/supabase";

async function ArticleList() {
  const articles = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, category: true },
  });
  return (
    <>
      {articles.map((article) => (
        <Card
          key={article.id}
          title={article.title}
          author={article.user.name}
          category={article.category.name}
          imageUrl={supabase.storage.from("post-images").getPublicUrl(article.imagePath).data.publicUrl}
          content={article.content}
          createdAt={article.createdAt.toISOString()}
        />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div>
      <div className={styles.searchArea}>
        <Input placeholder="検索したい記事を入力してください" variantSize="medium" />
        <Button label="検索" type="button" variant="secondary" size="medium" />
      </div>

      <div className={styles.cardList}>
        <Suspense
          fallback={Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        >
          <ArticleList />
        </Suspense>
      </div>
    </div>
  );
}
