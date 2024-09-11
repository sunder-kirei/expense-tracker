import { Prisma } from "@prisma/client";

const getUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    email: true,
    image: true,
    name: true,
    BankAccount: true,
    locale: true,
    period: true,
  },
});

const patchUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    email: true,
    image: true,
    name: true,
    locale: true,
    period: true,
  },
});

export type GetUser = Prisma.UserGetPayload<typeof getUser>;
export type PatchUser = Prisma.UserGetPayload<typeof patchUser>;
