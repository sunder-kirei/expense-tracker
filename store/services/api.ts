import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Prisma } from "@prisma/client";
import {
  DeleteAccount,
  DeleteCategory,
  DeleteTransaction,
  GetAccount,
  GetCategory,
  GetTransaction,
  GetUser,
  PostAccount,
  PostCategory,
  PostTransaction,
} from "@/types";
import { PostAccountInterface } from "@/schema/PostAccount.schema";
import { PostTransactionInterface } from "@/schema/PostTransaction.schema";
import { PostCategoryInterface } from "@/schema/PostCategory.schema";
import { DeleteCategoryInterface } from "@/schema/DeleteCategory.schema";
import { DeleteAccountInterface } from "@/schema/DeleteAccount.schema";
import { DeleteTransactionInterface } from "@/schema/DeleteTransaction.schema";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["categories", "accounts", "transactions"],
  endpoints: (builder) => ({
    // /api/user
    getUser: builder.query<GetUser, void>({
      query: () => ({ url: "/user", method: "GET" }),
    }),

    // /api/accounts
    getAccounts: builder.query<GetAccount[], void>({
      query: () => ({ url: "/accounts", method: "GET" }),
      transformResponse: (res, meta, arg) => {
        const response = res as any;
        return response.accounts;
      },
      providesTags: () => ["accounts"],
    }),
    postAccount: builder.mutation<PostAccount, PostAccountInterface>({
      query: (body) => ({
        url: "/accounts",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["accounts"],
    }),
    deleteAccount: builder.mutation<DeleteAccount, DeleteAccountInterface>({
      query: (body) => ({
        url: "/accounts",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["accounts"],
    }),

    // /api/transactions
    getTransactions: builder.query<GetTransaction[], void>({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
      transformResponse: (res, meta, arg) => {
        const response = res as any;
        return response.transactions;
      },
      providesTags: () => ["transactions"],
    }),
    postTransaction: builder.mutation<
      PostTransaction,
      PostTransactionInterface
    >({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["transactions"],
    }),
    deleteTransaction: builder.mutation<
      DeleteTransaction,
      DeleteTransactionInterface
    >({
      query: (body) => ({
        url: "/transactions",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["transactions"],
    }),

    // /api/categories
    getCategories: builder.query<GetCategory[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (res, meta, arg) => {
        const response = res as any;
        return response.categories;
      },
      providesTags: () => ["categories"],
    }),
    postCategory: builder.mutation<PostCategory, PostCategoryInterface>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<DeleteCategory, DeleteCategoryInterface>({
      query: (body) => ({
        url: "/categories",
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export default api;

export const {
  useGetUserQuery,
  useGetAccountsQuery,
  useGetCategoriesQuery,
  useGetTransactionsQuery,
  usePostAccountMutation,
  usePostCategoryMutation,
  usePostTransactionMutation,
  useDeleteCategoryMutation,
} = api;
