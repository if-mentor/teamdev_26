"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./styles.module.css";

export function SignUpForm() {
  return (
    <div className={styles.form}>
      <h1>新規登録</h1>
      <Input label="名前" placeholder="名前を入力" />
      <Input label="メールアドレス" placeholder="メールアドレスを入力" />
      <Input label="パスワード" type="password" placeholder="パスワードを入力" />
      <div>
        <Button label="登録する" type="submit" onClick={() => {}} disabled={false} variant="success" size="large" />
        <p className={styles.link}>
          すでにアカウントをお持ちの方は
          <span>
            <a href="/login" className={styles.login}>
              ログイン
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
