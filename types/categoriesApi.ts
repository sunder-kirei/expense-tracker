import { Prisma } from "@prisma/client";

const getCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  select: {
    id: true,
    name: true,
    userId: true,
  },
});

const postCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  select: {
    id: true,
    name: true,
    userId: true,
  },
});

export type GetCategory = Prisma.CategoryGetPayload<typeof getCategory>;
export type PostCategory = Prisma.CategoryGetPayload<typeof postCategory>;
export type DeleteCategory = Prisma.CategoryGetPayload<typeof postCategory>;
