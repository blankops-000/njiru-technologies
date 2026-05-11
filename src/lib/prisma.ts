import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

function createMockPrisma(): PrismaClient {
  const handler = () => ({
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    count: async () => 0,
    aggregate: async () => ({ _sum: { amount: 0 } }),
    create: async () => ({}),
    update: async () => ({}),
    upsert: async () => ({}),
    delete: async () => ({}),
    findFirstOrThrow: async () => { throw new Error('Not found') },
    findUniqueOrThrow: async () => { throw new Error('Not found') },
    $queryRaw: async () => [],
  });

  return new Proxy({} as PrismaClient, {
    get(_target, prop) {
      if (typeof prop === 'string' && !prop.startsWith('$') && !prop.startsWith('_')) {
        return new Proxy(handler, {
          get: () => handler,
        })();
      }
      return undefined as any;
    },
  });
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return createMockPrisma();
  }

  try {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch {
    return createMockPrisma();
  }
}

const globalForPrisma = global as unknown as { prismaGlobal?: PrismaClient };

if (!globalForPrisma.prismaGlobal) {
  globalForPrisma.prismaGlobal = createPrismaClient();
}

const prisma = globalForPrisma.prismaGlobal;

export default prisma;
