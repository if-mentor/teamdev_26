import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      categories.map((category) => ({
        id: category.id.toString(),
        name: category.name,
      })),
    );
  } catch (error) {
    console.error("カテゴリ取得エラー:", error);

    return NextResponse.json({ error: "カテゴリの取得に失敗しました" }, { status: 500 });
  }
}
