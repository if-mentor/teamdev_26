import { NextResponse } from "next/server";
import { supabase } from "@/libs/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const trimmedEmail = email?.trim();

  if (!trimmedEmail) {
    return NextResponse.json({ error: "メールアドレスを入力してください" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmedEmail)) {
    return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
  }

  const trimmedPassword = password?.trim();

  if (!trimmedPassword) {
    return NextResponse.json({ error: "パスワードを入力してください" }, { status: 400 });
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password: trimmedPassword,
  });
  if (error) {
    return NextResponse.json({ error: "メールアドレスまたはパスワードが一致しません" }, { status: 400 });
  }
  return NextResponse.json({ message: "ログインに成功しました" }, { status: 200 });
}
