import styles from "./styles.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

import { prisma } from "@/libs/prisma";

export default async function Home() {
  const articles = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, category: true },
  });

  return (
    <div>
      <div className={styles.searchArea}>
        <Input placeholder="検索したい記事を入力してください" variantSize="medium" />
        <Button label="検索" type="button" variant="secondary" size="medium" />
      </div>

      <div className={styles.cardList}>
        {articles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            author={article.user.name}
            category={article.category.name}
            imageUrl={article.imagePath ?? "/sample1.jpg"}
            content={article.content}
            createdAt={article.createdAt.toISOString()}
          />
        ))}
      </div>
    </div>
  );
}
