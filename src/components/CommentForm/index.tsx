import Button from "../Button";
import Input from "../Input";
import styles from "./styles.module.css";

const CommentForm = () => {
  return (
    <>
      <form className={styles.form}>
        <Input variantSize="large" placeholder="コメントを入力" className={styles.textArea} />
        <Button label="コメント" />
      </form>
    </>
  );
};

export default CommentForm;
