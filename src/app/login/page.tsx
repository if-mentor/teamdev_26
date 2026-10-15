"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./styles.module.css";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      if (data.error.includes("メールアドレス")) {
        setEmailError(data.error);
      } else if (data.error.includes("パスワード")) {
        setPasswordError(data.error);
      }

      return;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>ログイン</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="メールアドレス"
            type="email"
            placeholder="メールアドレスを入力"
            className={styles.inputMail}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
          />
          <Input
            label="パスワード"
            type="password"
            placeholder="パスワードを入力"
            className={styles.inputPassword}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
          />
          <Button type="submit" label="ログイン" size="large" />
          <p className={styles.p}>
            アカウントをお持ちでない方は
            <Link href="/signup" className={styles.link}>
              新規登録
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
