// prisma/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // In production, always create a new Prisma Client instance
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to store Prisma Client to avoid recreating it on each request
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
