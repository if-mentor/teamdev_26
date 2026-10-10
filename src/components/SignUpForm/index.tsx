"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./styles.module.css";
import Link from "next/link";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error.includes("名前")) {
        setNameError(data.error);
      } else if (data.error.includes("メールアドレス")) {
        setEmailError(data.error);
      } else if (data.error.includes("パスワード")) {
        setPasswordError(data.error);
      }

      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>新規登録</h1>

      <Input
        label="名前"
        placeholder="名前を入力"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={nameError}
      />

      <Input
        label="メールアドレス"
        placeholder="メールアドレスを入力"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={emailError}
      />

      <Input
        label="パスワード"
        type="password"
        placeholder="パスワードを入力"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={passwordError}
      />

      <div>
        <Button label="登録する" type="submit" disabled={false} variant="success" size="large" />

        <p className={styles.link}>
          すでにアカウントをお持ちの方は
          <span>
            <Link href="/login" className={styles.login}>
              ログイン
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}
