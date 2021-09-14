import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

async function main() {
  const posts = [
    {
      id: 1,
      words: ["hello", "world"],
    },
    {
      id: 2,
      words: ["2021-09-14T00:00:00.000Z"],
    },
    {
      id: 3,
      words: ["2021-09-14T00:00:00.000Z", "2021-09-20T12:00:00.000Z"],
    },
    {
      id: 4,
      words: ["hello", "2021-09-14T00:00:00.000Z"],
    },
  ];

  for (const post of posts) {
    const createdPost = await prisma.post.upsert({
      where: {
        id: post.id,
      },
      update: {},
      create: post,
    });

    console.log(
      `Successfully created post #${createdPost.id} with words ${createdPost.words}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
