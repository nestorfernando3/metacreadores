import { db } from "./index";
import { figures, figureExamples, exercises } from "./schema";
import { seedFigures } from "./seed-data";
import { seedExercises } from "./seed-exercises";

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

  console.log("\n🌱 Seeding exercises...\n");

  // Fetch all inserted figures to map slugs to IDs
  const allFigures = await db.select().from(figures);
  const figureBySlug = new Map(allFigures.map((f) => [f.slug, f]));

  let exercisesInserted = 0;
  for (const exerciseData of seedExercises) {
    const figure = figureBySlug.get(exerciseData.slug);
    if (!figure) {
      console.warn(`  ⚠️ Figure not found for slug: ${exerciseData.slug}, skipping`);
      continue;
    }

    const { slug, ...exerciseValues } = exerciseData;
    await db.insert(exercises).values({
      figureId: figure.id,
      type: exerciseValues.type,
      prompt: exerciseValues.prompt,
      promptEn: exerciseValues.promptEn,
      options: exerciseValues.options,
      correctAnswer: exerciseValues.correctAnswer,
      difficultyLevel: exerciseValues.difficultyLevel,
    });
    exercisesInserted++;
  }

  console.log(`  ✅ ${exercisesInserted} exercise(s) inserted`);

  console.log("\n✅ Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
