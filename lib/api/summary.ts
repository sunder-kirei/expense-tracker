import { prisma } from "@/prisma";
import { AccountExpenseSummary, CategorySummary, TrxSummary } from "@/types";
import { User } from "@prisma/client";
import { normalizeDate } from "../date";
import { generateRandomColor } from "../generateColor";

export async function accountSummary(user: User, from: Date, to: Date) {
  from = normalizeDate(from);
  to = normalizeDate(to);

  const accounts = await prisma.bankAccount.findMany({
    where: {
      userId: user.id,
    },
  });

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
      WHERE 
        t.date
          BETWEEN 
            ${from}
              AND 
            ${to}
          AND u.id = ${user.id}
      GROUP BY ba.id;`;

  const data: AccountExpenseSummary[] = (queryResult as any).map(
    (item: any) => ({
      ...item,
      income: Number(item.income),
      expense: Number(item.expense),
      incomeCount: Number(item.incomeCount),
      expenseCount: Number(item.expenseCount),
    })
  );

  accounts.forEach((acc) => {
    const foundIdx = data.find((a) => a.id === acc.id);
    if (!foundIdx) {
      data.push({
        ...acc,
        income: 0,
        incomeCount: 0,
        expense: 0,
        expenseCount: 0,
      });
    }
  });

  return data;
}

export async function categorySummary(user: User, from: Date, to: Date) {
  from = normalizeDate(from);
  to = normalizeDate(to);

  const queryResult = await prisma.$queryRaw`SELECT c.*, temp.* FROM
  (SELECT t."categoryId", COUNT(*),
    SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) as income,
    ABS(SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END)) as expense
    FROM 
      "Category" as c
      RIGHT JOIN 
      "Transaction" as t
      ON c.id = t."categoryId" OR t."categoryId" IS NULL
    WHERE 
        c."userId" = ${user.id}
        AND
          t.date
            BETWEEN ${from}
            AND 
            ${to}
    GROUP BY t."categoryId") as temp
    LEFT JOIN
    "Category" as c
    ON temp."categoryId" = c.id;`;

  const data: CategorySummary[] = (queryResult as any).map((item: any) => ({
    id: item.id ?? undefined,
    name: item.name ?? undefined,
    userId: item.userId ?? undefined,
    count: Number(item.count),
    income: Number(item.income),
    expense: Number(item.expense),
    fill: generateRandomColor(),
  }));

  return data;
}

function comp(a: Date, b: Date) {
  if (a.getUTCFullYear() === b.getUTCFullYear()) {
    if (a.getUTCMonth() === b.getUTCMonth()) {
      if (a.getUTCDate() === b.getUTCDate()) {
        return 0;
      }
      return a.getUTCDate() < b.getUTCDate() ? -1 : 1;
    }
    return a.getUTCMonth() < b.getUTCMonth() ? -1 : 1;
  }
  return a.getUTCFullYear() < b.getUTCFullYear() ? -1 : 1;
}

export async function transactionSummary(user: User, from: Date, to: Date) {
  from = normalizeDate(from);
  to = normalizeDate(to);

  const queryResult = await prisma.$queryRaw`SELECT t.date,
    SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) as income,
    ABS(SUM(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END)) as expense,
    COUNT(*) FROM
      "Transaction" as t
      WHERE
        t."userId" = ${user.id}
        AND
          t.date
            BETWEEN ${from}
            AND 
            ${to}
      GROUP BY t.date
      ORDER BY t.date`;
  const mapQuery: TrxSummary[] = (queryResult as any).map((item: any) => ({
    date: item.date,
    income: Number(item.income),
    expense: Number(item.expense),
    count: Number(item.count),
  }));

  const temp = from;
  let currIdx = 0;
  const data = [] as TrxSummary[];
  while (temp <= to) {
    if (currIdx < mapQuery.length && comp(mapQuery[currIdx].date, temp) === 0) {
      data.push(mapQuery[currIdx]);
      currIdx++;
      temp.setDate(temp.getDate() + 1);
    } else if (
      currIdx < mapQuery.length &&
      comp(mapQuery[currIdx].date, temp) === -1
    ) {
      currIdx++;
    } else {
      data.push({
        date: new Date(temp),
        income: 0,
        expense: 0,
        count: 0,
      });
      temp.setDate(temp.getDate() + 1);
    }
  }

  return { data };
}
