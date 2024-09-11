import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { AccountExpenseSummary } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function convert(res: any): AccountExpenseSummary {
  return {
    ...res,
    income: String(res.income),
    expense: String(res.expense),
    incomeCount: String(res.incomeCount),
    expenseCount: String(res.expenseCount),
  };
}

export async function GET(request: NextRequest) {
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

    const queryResult = await prisma.$queryRaw`SELECT ba.*,
      SUM(CASE WHEN t.amount >= 0 THEN t.amount ELSE 0 END) as income,
      COUNT(CASE WHEN t.amount >= 0 THEN 1 ELSE NULL END) as "incomeCount",
      SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END) as expense,
      COUNT(CASE WHEN t.amount < 0 THEN 1 ELSE NULL END) as "expenseCount"
      FROM (
        ("User" as u 
          INNER JOIN "BankAccount" as ba 
          ON u.id = ba."userId"
        )
        LEFT JOIN 
        "Transaction" as t
        ON u.id = t."userId" AND ba.id = t."bankAccountId"
      )
      group by ba.id;`;

    const data: AccountExpenseSummary[] = (queryResult as any).map(
      (item: any) => convert(item)
    );

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
