import styles from "./styles.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "next/link";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>ログイン</h1>
        <form className={styles.form}>
          <Input label="メールアドレス" type="email" placeholder="メールアドレスを入力" className={styles.inputMail} />
          <Input label="パスワード" type="password" placeholder="パスワードを入力" className={styles.inputPassword} />
          <Button type="submit" label="ログイン" size="large" />
          <p className={styles.p}>
            アカウントをお持ちでない方は
            <Link href="/signup" className={styles.Link}>
              新規登録
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
