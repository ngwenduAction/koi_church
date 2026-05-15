import { PrismaClient } from "@prisma/client";

const globalForDatabase = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const db =
  globalForDatabase.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.prisma = db;
}
