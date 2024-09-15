import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { DeleteTransactionSchema } from "@/schema/DeleteTransaction.schema";
import { PostTransactionSchema } from "@/schema/PostTransaction.schema";
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
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      include: {
        category: true,
        bankAccount: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({ transactions }, { status: 200 });
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
    const { amount, bankAccountId, categoryId, date, payee, type, notes } =
      PostTransactionSchema.parse(await req.json());
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

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return NextResponse.json(
          {
            error: "Category does not exist.",
          },
          { status: 400 }
        );
      }
    }

    const account = await prisma.bankAccount.findUnique({
      where: { id: bankAccountId },
    });

    if (!account) {
      return NextResponse.json(
        {
          error: "Account does not exist.",
        },
        { status: 400 }
      );
    }

    const createdTrx = await prisma.transaction.create({
      data: {
        amount,
        date,
        payee,
        bankAccountId,
        notes,
        type,
        categoryId,
        userId: user.id,
      },
      include: {
        bankAccount: true,
        category: true,
      },
    });

    return NextResponse.json({ ...createdTrx }, { status: 201 });
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
    const { ids } = DeleteTransactionSchema.parse(await req.json());
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

    const deletedTransaction = await prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ ...deletedTransaction }, { status: 202 });
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
