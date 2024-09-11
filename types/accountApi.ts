import { Prisma } from "@prisma/client";

const getAccount = Prisma.validator<Prisma.BankAccountDefaultArgs>()({
  select: {
    id: true,
    accountName: true,
    accountType: true,
    accountNumber: true,
    userId: true,
    bankName: true,
    isPrimary: true,
  },
});

const postAccount = Prisma.validator<Prisma.BankAccountDefaultArgs>()({
  select: {
    id: true,
    accountName: true,
    accountType: true,
    accountNumber: true,
    userId: true,
    isPrimary: true,
  },
});

export type GetAccount = Prisma.BankAccountGetPayload<typeof getAccount>;
export type PostAccount = Prisma.BankAccountGetPayload<typeof postAccount>;
export type DeleteAccount = Prisma.BankAccountGetPayload<typeof postAccount>;
