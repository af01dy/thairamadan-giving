import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: ["error", "warn"],
});


async function main() {
  await prisma.cause.createMany({
    data: [
      {
        title: "Iftar Meals for Families",
        description: "Help provide warm iftar meals to families in need during Ramadan. Small gifts can feed many.",
        infoUrl: "https://your-charity-site.com/iftar",
        bank: "IBAN: IT00 X000 0000 0000 0000 0000 000",
        tags: ["Iftar", "Food", "Local"],
        category: "Food",
        imgUrl:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=70",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed complete");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
