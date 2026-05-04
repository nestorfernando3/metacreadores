import {
  pgTable,
  serial,
  uuid,
  varchar,
  text,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Reference to Supabase Auth users table (for foreign key constraints)
// ---------------------------------------------------------------------------
export const authUsers = pgTable("auth.users", {
  id: uuid("id").primaryKey(),
});

// ---------------------------------------------------------------------------
// profiles — extends Supabase Auth users
// ---------------------------------------------------------------------------
export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("student"),
  displayName: varchar("display_name", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// figures — rhetorical figures catalog
// ---------------------------------------------------------------------------
export const figures = pgTable("figures", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }),
  definition: text("definition").notNull(),
  definitionEn: text("definition_en"),
  category: varchar("category", { length: 100 }).notNull(),
  difficultyLevel: integer("difficulty_level").notNull().default(1),
  historicalContext: text("historical_context"),
  historicalContextEn: text("historical_context_en"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// figure_examples — literary examples with regional diversity
// ---------------------------------------------------------------------------
export const figureExamples = pgTable("figure_examples", {
  id: serial("id").primaryKey(),
  figureId: integer("figure_id")
    .notNull()
    .references(() => figures.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  textEn: text("text_en"),
  author: varchar("author", { length: 255 }).notNull(),
  work: varchar("work", { length: 255 }).notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  era: varchar("era", { length: 100 }),
  explanation: text("explanation").notNull(),
  explanationEn: text("explanation_en"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// exercises — practice exercises (schema only for Phase 1)
// ---------------------------------------------------------------------------
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  figureId: integer("figure_id")
    .notNull()
    .references(() => figures.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(),
  prompt: text("prompt").notNull(),
  promptEn: text("prompt_en"),
  options: jsonb("options"),
  correctAnswer: text("correct_answer"),
  difficultyLevel: integer("difficulty_level").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// user_progress — learning progress tracking (schema only for Phase 1)
// ---------------------------------------------------------------------------
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  figureId: integer("figure_id")
    .notNull()
    .references(() => figures.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).notNull().default("not_started"),
  exercisesCompleted: integer("exercises_completed").notNull().default(0),
  exercisesCorrect: integer("exercises_correct").notNull().default(0),
  lastPracticedAt: timestamp("last_practiced_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------
export const figuresRelations = relations(figures, ({ many }) => ({
  examples: many(figureExamples),
  exercises: many(exercises),
}));

export const figureExamplesRelations = relations(
  figureExamples,
  ({ one }) => ({
    figure: one(figures, {
      fields: [figureExamples.figureId],
      references: [figures.id],
    }),
  }),
);

export const exercisesRelations = relations(exercises, ({ one }) => ({
  figure: one(figures, {
    fields: [exercises.figureId],
    references: [figures.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  profile: one(profiles, {
    fields: [userProgress.userId],
    references: [profiles.id],
  }),
  figure: one(figures, {
    fields: [userProgress.figureId],
    references: [figures.id],
  }),
}));

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Figure = typeof figures.$inferSelect;
export type NewFigure = typeof figures.$inferInsert;
export type FigureExample = typeof figureExamples.$inferSelect;
export type NewFigureExample = typeof figureExamples.$inferInsert;
export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
