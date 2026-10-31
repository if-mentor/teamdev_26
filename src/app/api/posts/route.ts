import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/libs/supabase/server";
import { prisma } from "@/libs/prisma";

const BUCKET_NAME = "post-images";
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

export async function POST(request: Request) {
  // ログインしているユーザーを確認
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "ログイン情報を確認できません" }, { status: 401 });
  }

  // 投稿データを受け取る
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "投稿データの形式が正しくありません" }, { status: 400 });
  }

  const titleValue = formData.get("title");
  const contentValue = formData.get("content");
  const categoryValue = formData.get("categoryId");
  const image = formData.get("image");

  const title = typeof titleValue === "string" ? titleValue.trim() : "";

  const content = typeof contentValue === "string" ? contentValue.trim() : "";

  // バリデーション
  if (title.length < 1 || title.length > 40) {
    return NextResponse.json({ error: "タイトルは1〜40文字で入力してください" }, { status: 400 });
  }

  if (content.length < 10 || content.length > 1000) {
    return NextResponse.json({ error: "記事詳細は10〜1000文字で入力してください" }, { status: 400 });
  }

  if (typeof categoryValue !== "string" || !/^[1-9]\d*$/.test(categoryValue)) {
    return NextResponse.json({ error: "カテゴリを選択してください" }, { status: 400 });
  }

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "画像を選択してください" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(image.type)) {
    return NextResponse.json({ error: "JPEGまたはPNGの画像を選択してください" }, { status: 400 });
  }

  if (image.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "画像は3MB以下にしてください" }, { status: 400 });
  }

  let categoryId: bigint;

  try {
    categoryId = BigInt(categoryValue);
  } catch {
    return NextResponse.json({ error: "カテゴリが正しくありません" }, { status: 400 });
  }

  try {
    // ユーザーとカテゴリが存在するか確認
    const [existingUser, category] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.id },
      }),
      prisma.category.findUnique({
        where: { id: categoryId },
      }),
    ]);

    if (!existingUser) {
      return NextResponse.json({ error: "ユーザー情報が見つかりません" }, { status: 404 });
    }

    if (!category) {
      return NextResponse.json({ error: "カテゴリが見つかりません" }, { status: 400 });
    }

    // 画像をSupabase Storageに保存
    const extension = image.type === "image/png" ? "png" : "jpg";
    const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, image, {
      contentType: image.type,
      upsert: false,
    });

    if (uploadError) {
      console.error("画像保存エラー:", uploadError);

      return NextResponse.json({ error: "画像の保存に失敗しました" }, { status: 500 });
    }

    try {
      // Prismaで記事を保存
      const post = await prisma.post.create({
        data: {
          userId: user.id,
          categoryId,
          title,
          content,
          imagePath: filePath,
        },
      });

      return NextResponse.json(
        {
          message: "記事を投稿しました",
          id: post.id.toString(),
        },
        { status: 201 },
      );
    } catch (dbError) {
      // 記事保存に失敗したら画像も削除
      const { error: removeError } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

      if (removeError) {
        console.error("画像削除エラー:", removeError);
      }

      throw dbError;
    }
  } catch (error) {
    console.error("記事投稿エラー:", error);

    return NextResponse.json({ error: "記事の投稿に失敗しました" }, { status: 500 });
  }
}
