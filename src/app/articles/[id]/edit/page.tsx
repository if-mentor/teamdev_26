import styles from "./styles.module.css";
import Input from "@/components/Input";
import ImageUploaderPreview from "@/components/ImageUploaderPreview";
import SelectBox from "@/components/SelectBox";
import Button from "@/components/Button";

const dummyOptions = [
  { id: 1, value: "ファッション" },
  { id: 2, value: "ライフスタイル" },
  { id: 3, value: "その他" },
];

const ArticleEditPage = () => {
  return (
    <>
      <main className={styles.content}>
        <div className={styles.inner}>
          <form className={styles.form}>
            <Input name="title" placeholder="タイトルを入力" variantSize="large"></Input>
            <div className={styles.imageUploaderPreviewWrap}>
              <ImageUploaderPreview />
            </div>
            <div className={styles.selectBoxWrap}>
              <SelectBox name="category" label="カテゴリ" placeholder="カテゴリ選択" options={dummyOptions} />
            </div>
            <textarea
              name="content"
              defaultValue="テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります..."
              className={styles.textArea}
            ></textarea>
            <div className={styles.buttonWrap}>
              <Button label="更新" variant="success" type="submit" />
              <Button label="削除" variant="danger" type="button" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ArticleEditPage;
