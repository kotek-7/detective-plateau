import { PrismaClient } from "../generated/prisma_client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../src/env.js";

const adapter = new PrismaPg({
  connectionString: env.DIRECT_DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Clear existing data
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  })

  const charlie = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie',
    },
  })

  // Create posts
  await prisma.post.create({
    data: {
      title: 'I started using Prisma with TypeScript Project!',
      authorId: alice.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'I need to study Next.js more',
      content: 'Next.js is a React framework for production.',
      published: true,
      authorId: alice.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'I cannot wait for Next.js Conference',
      authorId: charlie.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'I am planning to use Prisma',
      authorId: charlie.id,
    },
  })

  await prisma.post.create({
    data: {
      title: "I am doing 100 Days' TypeScript Challenge",
      authorId: charlie.id,
    },
  })

  console.log('Seed data inserted successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })