import { auth } from "@/auth";
import { categorySummary } from "@/lib/api/summary";
import { prisma } from "@/prisma";
import { SummarySchema } from "@/schema/api/Summary.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { from, to } = SummarySchema.parse(
      Object.fromEntries(request.nextUrl.searchParams)
    );
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
    const data = await categorySummary(user, from, to);

    return NextResponse.json(
      {
        data,
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
