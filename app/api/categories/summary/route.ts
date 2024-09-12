import { auth } from "@/auth";
import { accountSummary, categorySummary } from "@/lib/api/summary";
import { prisma } from "@/prisma";
import { TrxSummarySchema } from "@/schema/api/TrxSummary.schema";
import { AccountExpenseSummary } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const period = TrxSummarySchema.parse(
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
    const data = await categorySummary(user, period.period || user.period);

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
