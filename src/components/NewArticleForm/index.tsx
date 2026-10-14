"use client";

import Button from "../Button";
import ImageUploaderPreview from "../ImageUploaderPreview";
import Input from "../Input";
import SelectBox from "../SelectBox";
import styles from "./styles.module.css";

export function NewArticleForm() {
  return (
    <form className={styles.form}>
      <Input placeholder="タイトルを入力" variantSize="large" />
      <ImageUploaderPreview />
      <SelectBox options={[]} label="カテゴリ" placeholder="カテゴリを選択" />
      <textarea className={styles.textarea}></textarea>
      <Button type="button" variant="success" disabled={false} onClick={() => {}} label="投稿" />
    </form>
  );
}
