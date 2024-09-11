import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { DeleteCategorySchema } from "@/schema/DeleteCategory.schema";
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
    const { name } = PostCategorySchema.parse(await req.json());
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
      include: { Category: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundCategory = user.Category.find((c) => c.name === name);
    if (foundCategory) {
      return NextResponse.json(
        {
          error: "Category already exists, conflict.",
        },
        { status: 403 }
      );
    }

    const createdCategory = await prisma.category.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json({ ...createdCategory }, { status: 201 });
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = DeleteCategorySchema.parse(await req.json());
    console.log(id);
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
      include: { Category: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundCategory = user.Category.find((c) => c.id === id);
    if (!foundCategory) {
      return NextResponse.json(
        {
          error: "Category does not exist.",
        },
        { status: 404 }
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ ...deletedCategory }, { status: 202 });
  } catch (err: any) {
    console.log(err);
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
