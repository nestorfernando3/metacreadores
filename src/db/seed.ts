import { db } from "./index";
import { figures, figureExamples } from "./schema";
import { seedFigures } from "./seed-data";

async function seed() {
  console.log("🌱 Seeding figures...\n");

  for (const figureData of seedFigures) {
    const { examples, ...figure } = figureData;

    const [insertedFigure] = await db.insert(figures).values(figure).returning();
    console.log(`  ✅ ${insertedFigure.name} (${insertedFigure.slug}) — ${insertedFigure.category}`);

    if (examples && examples.length > 0) {
      await db.insert(figureExamples).values(
        examples.map((ex) => ({
          figureId: insertedFigure.id,
          text: ex.text,
          textEn: ex.textEn,
          author: ex.author,
          work: ex.work,
          region: ex.region,
          era: ex.era,
          explanation: ex.explanation,
          explanationEn: ex.explanationEn,
        })),
      );
      console.log(`     📝 ${examples.length} example(s) inserted`);
    }
  }

  console.log("\n✅ Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
