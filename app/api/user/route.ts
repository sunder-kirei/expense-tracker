import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { PatchUserSchema } from "@/schema/PatchUser.schema";
import { NextRequest, NextResponse } from "next/server";

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
      include: {
        BankAccount: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        email: user.email,
        image: user.image,
        name: user.name,
        locale: user.locale,
        accounts: user.BankAccount,
        period: user.period,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.toString(),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { locale, name, period } = PatchUserSchema.parse(await req.json());
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
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { name, locale, period },
    });

    return NextResponse.json(
      {
        email: updatedUser.email,
        image: updatedUser.image,
        name: updatedUser.name,
        locale: updatedUser.locale,
        period: updatedUser.period,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.toString(),
      },
      { status: 500 }
    );
  }
}
