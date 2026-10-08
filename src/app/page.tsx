import styles from "./styles.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  const articles = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "記事タイトル",
    author: "山田 太郎",
    category: "カテゴリ",
    imageUrl: "/sample1.jpg",
    content: "記事本文",
    createdAt: "2026-09-30T12:00:00+09:00",
  }));

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
            author={article.author}
            category={article.category}
            imageUrl={article.imageUrl}
            content={article.content}
            createdAt={article.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
