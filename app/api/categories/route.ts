import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { PostAccountSchema } from "@/schema/PostAccount.schema";
import { PostCategorySchema } from "@/schema/PostCategory.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email ?? undefined },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.toString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = PostCategorySchema.parse(req.body);
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email ?? undefined },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const createdCategory = await prisma.category.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { category: { ...createdCategory } },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: err.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: err.toString(),
      },
      { status: 500 }
    );
  }
}
