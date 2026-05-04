import { db } from "./index";
import { figures, figureExamples } from "./schema";
import { count } from "drizzle-orm";

async function verify() {
  console.log("🔍 Verifying seed data...\n");

  // Count figures
  const figureCount = await db.select({ count: count() }).from(figures);
  const numFigures = figureCount[0].count;
  console.log(`  📊 Figures: ${numFigures}`);
  if (numFigures < 15) {
    throw new Error(`❌ Only ${numFigures} figures — need at least 15`);
  }
  console.log(`     ✅ At least 15 figures: PASS`);

  // Count examples
  const exampleCount = await db.select({ count: count() }).from(figureExamples);
  const numExamples = exampleCount[0].count;
  console.log(`  📝 Examples: ${numExamples}`);

  // List figures with their slugs
  const allFigures = await db
    .select({ slug: figures.slug, name: figures.name, category: figures.category })
    .from(figures)
    .orderBy(figures.name);

  console.log("\n  Figures seeded:");
  for (const f of allFigures) {
    console.log(`    - ${f.name} (${f.slug}) [${f.category}]`);
  }

  // Count regions
  const regions = await db
    .select({ region: figureExamples.region })
    .from(figureExamples)
    .groupBy(figureExamples.region)
    .orderBy(figureExamples.region);

  console.log(`\n  🌍 Regions covered (${regions.length}):`);
  for (const r of regions) {
    console.log(`    - ${r.region}`);
  }

  if (regions.length < 3) {
    throw new Error(`❌ Only ${regions.length} regions — need at least 3`);
  }
  console.log(`     ✅ At least 3 regions: PASS`);

  // Count difficulty levels
  const difficulties = await db
    .select({ level: figures.difficultyLevel, count: count() })
    .from(figures)
    .groupBy(figures.difficultyLevel)
    .orderBy(figures.difficultyLevel);

  console.log("\n  🎯 Difficulty levels:");
  for (const d of difficulties) {
    console.log(`    - Level ${d.level}: ${d.count} figures`);
  }

  // Count categories
  const cats = await db
    .select({ category: figures.category, count: count() })
    .from(figures)
    .groupBy(figures.category);

  console.log("\n  📁 Categories:");
  for (const c of cats) {
    console.log(`    - ${c.category}: ${c.count} figures`);
  }

  console.log("\n✅ All verifications passed!");
}

verify().catch((err) => {
  console.error("\n❌ Verification failed:", err.message);
  process.exit(1);
});
