"use client";

//import Button from "@/components/Button";
import Input from "@/components/Input";

export function SignUpForm() {
  return (
    <div>
      <Input label="名前" placeholder="名前を入力" />
      <Input label="メールアドレス" placeholder="メールアドレスを入力" />
      <Input label="パスワード" type="password" placeholder="パスワードを入力" />
      <p>
        すでにアカウントをお持ちの方は<a href="/login">ログイン</a>
      </p>
    </div>
  );
}
