import { NextResponse } from "next/server";
import { supabase } from "@/libs/supabase";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return NextResponse.json({ error: "名前を入力してください" }, { status: 400 });
  }

  if (trimmedName.length > 12) {
    return NextResponse.json({ error: "名前は12文字以内で入力してください" }, { status: 400 });
  }

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

  if (trimmedPassword.length < 8) {
    return NextResponse.json({ error: "パスワードは8文字以上で入力してください" }, { status: 400 });
  }

  if (trimmedPassword.length > 24) {
    return NextResponse.json({ error: "パスワードは24文字以内で入力してください" }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: trimmedEmail,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail,
    password: trimmedPassword,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data.user) {
    return NextResponse.json({ error: "ユーザー登録に失敗しました" }, { status: 500 });
  }

  await prisma.user.create({
    data: {
      id: data.user.id,
      name: trimmedName,
      email: trimmedEmail,
    },
  });

  return NextResponse.json({ message: "ユーザー登録が完了しました" }, { status: 201 });
}
