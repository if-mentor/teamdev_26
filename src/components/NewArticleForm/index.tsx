"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../Button";
import ImageUploaderPreview from "../ImageUploaderPreview";
import Input from "../Input";
import SelectBox from "../SelectBox";
import styles from "./styles.module.css";

export function NewArticleForm() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    category: "",
    content: "",
  });

  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("カテゴリの取得に失敗しました");
        }

        const data: { id: string; name: string }[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("カテゴリ取得エラー:", error);
      }
    };

    void fetchCategories();
  }, []);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      title: "",
      image: "",
      category: "",
      content: "",
    };

    if (!title.trim() || title.trim().length > 40) {
      nextErrors.title = "タイトルは1〜40文字で入力してください";
    }

    if (!imageFile) {
      nextErrors.image = "画像を選択してください";
    } else if (imageFile.size > 3 * 1024 * 1024) {
      nextErrors.image = "画像は3MB以下にしてください";
    }

    if (!categoryId) {
      nextErrors.category = "カテゴリを選択してください";
    }

    if (content.trim().length < 10 || content.trim().length > 1000) {
      nextErrors.content = "記事詳細は10〜1000文字で入力してください";
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some((message) => message !== "")) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("記事投稿エラー:", data.error);
        return;
      }
      router.push(`/articles/${data.id}`);
    } catch (error) {
      console.error("記事投稿エラー:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        placeholder="タイトルを入力"
        variantSize="large"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={errors.title}
      />
      <ImageUploaderPreview imageFile={imageFile ?? undefined} onChange={setImageFile} />
      {errors.image && <p className={styles.error}>{errors.image}</p>}
      <SelectBox
        options={categories.map((category) => ({
          id: Number(category.id),
          value: category.name,
        }))}
        label="カテゴリ"
        placeholder="カテゴリを選択"
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
      />
      {errors.category && <p className={styles.error}>{errors.category}</p>}
      <textarea className={styles.textarea} value={content} onChange={(event) => setContent(event.target.value)} />
      {errors.content && <p className={styles.error}>{errors.content}</p>}
      <Button type="submit" variant="success" disabled={false} label="投稿" />
    </form>
  );
}
