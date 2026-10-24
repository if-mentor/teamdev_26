import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "記事IDが正しくありません" }, { status: 400 });
  }

  try {
    // テスト用：意図的にエラーを発生させる
    // throw new Error("500エラーのテスト");

    const comments = await prisma.comment.findMany({
      where: { postId: BigInt(id) },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(comments[0]?.user);

    return NextResponse.json(
      comments.map((comment) => ({
        ...comment,
        id: comment.id.toString(),
        postId: comment.postId.toString(),
      })),
    );
  } catch (error) {
    console.error("failed to get comments:", error);

    return NextResponse.json({ error: "コメントの取得に失敗しました" }, { status: 500 });
  }
}
