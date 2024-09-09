import { Prisma } from "@prisma/client";

const getUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: { email: true, image: true, name: true, BankAccount: true },
});

export type GetUser = Prisma.UserGetPayload<typeof getUser>;
