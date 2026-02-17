const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.cause.deleteMany({});

  await prisma.cause.createMany({
    data: [
      {
        title: "Iftar Meals for Families",
        description:
          "Help provide warm iftar meals to families in need during Ramadan. Small gifts can feed many.",
        infoUrl: "https://example.com/iftar-meals",
        bankName: "Intesa Sanpaolo",
        bank: "IBAN: IT00 X000 0000 0000 0000 0000 000",
        tags: ["Iftar", "Food", "Local"],
        category: "Food",
        imgUrl:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=70",
        isActive: true,
      },
      {
        title: "Zakat Fund (Emergency Support)",
        description:
          "Support urgent needs: rent help, medicine, and basic supplies for verified cases.",
        infoUrl: "https://example.com/zakat-fund",
        bankName: "UniCredit",
        bank: "Acc: 123456789 • Ref: ZAKAT",
        tags: ["Zakat", "Emergency", "Verified"],
        category: "Zakat",
        imgUrl:
          "https://images.unsplash.com/photo-1520975958225-4a2d28f6c68b?auto=format&fit=crop&w=1200&q=70",
        isActive: true,
      },
      {
        title: "Water Wells Project",
        description:
          "Build sustainable water wells in communities without clean water access. Sadaqah Jariyah.",
        infoUrl: "https://example.com/water-wells",
        bankName: "Banco BPM",
        bank: "IBAN: IT22 Z222 2222 2222 2222 2222 222",
        tags: ["Water", "Sadaqah Jariyah", "Impact"],
        category: "Water",
        imgUrl:
          "https://images.unsplash.com/photo-1594398901394-4e34939a46cc?auto=format&fit=crop&w=1200&q=70",
        isActive: true,
      },
      {
        title: "Medical Aid for Refugees",
        description:
          "Provide essential medical supplies and healthcare to refugee families in crisis zones.",
        infoUrl: "https://example.com/medical-aid",
        bankName: "BPER Banca",
        bank: "Acc: 987654321 • Ref: HEALTH",
        tags: ["Medical", "Refugees", "Urgent"],
        category: "Medical",
        imgUrl:
          "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=70",
        isActive: true,
      },
    ],
  });

  console.log("✅ Seed complete");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });