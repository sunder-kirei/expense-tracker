import { Prisma } from "@prisma/client";

const getTransaction = Prisma.validator<Prisma.TransactionDefaultArgs>()({
  select: {
    id: true,
    category: true,
    amount: true,
    payee: true,
    notes: true,
    date: true,
    type: true,
    userId: true,
    bankAccountId: true,
    categoryId: true,
    bankAccount: true,
  },
});

const postTransaction = Prisma.validator<Prisma.TransactionDefaultArgs>()({
  select: {
    id: true,
    amount: true,
    payee: true,
    notes: true,
    date: true,
    type: true,
    userId: true,
    bankAccountId: true,
    categoryId: true,
    bankAccount: true,
    category: true,
  },
});

export type GetTransaction = Prisma.TransactionGetPayload<
  typeof getTransaction
>;
export type PostTransaction = Prisma.TransactionGetPayload<
  typeof postTransaction
>;
export type DeleteTransaction = Prisma.TransactionGetPayload<
  typeof postTransaction
>;
