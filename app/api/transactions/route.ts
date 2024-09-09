import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { DeleteTransactionSchema } from "@/schema/DeleteTransaction.schema";
import { PostTransactionSchema } from "@/schema/PostTransaction.schema";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

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
    const {
      amount,
      bankAccountId,
      categoryId,
      date,
      payee,

      type,
      notes,
    } = PostTransactionSchema.parse(await req.json());
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
    const { id } = DeleteTransactionSchema.parse(await req.json());
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
      include: { Transaction: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundTrx = user.Transaction.find((c) => c.id === id);
    if (!foundTrx) {
      return NextResponse.json(
        {
          error: "Transaction does not exist.",
        },
        { status: 404 }
      );
    }

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ ...deletedTransaction }, { status: 202 });
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
