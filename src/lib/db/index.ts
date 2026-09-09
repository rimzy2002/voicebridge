// Prisma client wrapper with graceful fallback

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientConstructor: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaPkg = require('@prisma/client');
  PrismaClientConstructor = prismaPkg.PrismaClient;
} catch {
  // Graceful fallback if prisma engine has not been generated
  PrismaClientConstructor = class MockPrismaClient {};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any;
};

export const db =
  globalForPrisma.prisma ??
  (PrismaClientConstructor ? new PrismaClientConstructor() : ({} as any));

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

export default db;
