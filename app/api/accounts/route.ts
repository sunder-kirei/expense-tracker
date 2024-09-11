import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { DeleteAccountSchema } from "@/schema/DeleteAccount.schema";
import { PostAccountSchema } from "@/schema/PostAccount.schema";
import { PutAccountSchema } from "@/schema/PutAccount.schema";
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
    const accounts = await prisma.bankAccount.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ accounts }, { status: 200 });
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
    const { accountName, accountType, accountNumber, isPrimary, bankName } =
      PostAccountSchema.parse(await req.json());
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
      include: { BankAccount: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundAccount = user.BankAccount.find(
      (a) =>
        a.accountName === accountName &&
        a.bankName.toLowerCase() === bankName.toLowerCase()
    );

    if (foundAccount) {
      return NextResponse.json(
        {
          error: "Account already exists, conflict.",
        },
        { status: 403 }
      );
    }

    const createdAcc = await prisma.bankAccount.create({
      data: {
        accountName,
        accountNumber,
        accountType,
        userId: user.id,
        isPrimary,
        bankName,
      },
    });

    return NextResponse.json({ ...createdAcc }, { status: 201 });
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
    const { id } = DeleteAccountSchema.parse(await req.json());
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
      include: { BankAccount: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundAcc = user.BankAccount.find((a) => a.id === id);
    if (!foundAcc) {
      return NextResponse.json(
        {
          error: "Account does not exist.",
        },
        { status: 404 }
      );
    }

    const deletedAccount = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ ...deletedAccount }, { status: 202 });
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

export async function PUT(req: NextRequest) {
  try {
    const {
      accountName,
      accountType,
      accountNumber,
      isPrimary,
      bankName,
      accountId,
    } = PutAccountSchema.parse(await req.json());
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
      include: { BankAccount: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const foundAccount = user.BankAccount.find((a) => a.id === accountId);

    if (!foundAccount) {
      return NextResponse.json(
        {
          error: "Account does not exist.",
        },
        { status: 404 }
      );
    }

    const createdAcc = await prisma.bankAccount.update({
      where: {
        id: accountId,
      },
      data: {
        accountName,
        accountNumber,
        accountType,
        userId: user.id,
        isPrimary,
        bankName,
      },
    });

    return NextResponse.json({ ...createdAcc }, { status: 201 });
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
