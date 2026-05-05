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
import { relations, sql } from "drizzle-orm";

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
// writing_submissions — saved student writing samples (Phase 2 Wave 3)
// ---------------------------------------------------------------------------
export const writingSubmissions = pgTable("writing_submissions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  locale: varchar("locale", { length: 10 }).notNull().default("es"),
  title: varchar("title", { length: 255 }),
  rawText: text("raw_text").notNull(),
  savedAt: timestamp("saved_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// analysis_runs — cached AI analysis results (Phase 2 Wave 3)
// ---------------------------------------------------------------------------
export const analysisRuns = pgTable("analysis_runs", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => writingSubmissions.id, { onDelete: "cascade" }),
  model: varchar("model", { length: 100 }).notNull(),
  locale: varchar("locale", { length: 10 }).notNull().default("es"),
  contentHash: varchar("content_hash", { length: 64 }).notNull(),
  confidence: integer("confidence").default(0),
  analysisJson: jsonb("analysis_json"),
  feedbackJson: jsonb("feedback_json"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// Relations (existing + Phase 2 additions)
// ---------------------------------------------------------------------------
export const writingSubmissionsRelations = relations(
  writingSubmissions,
  ({ one, many }) => ({
    profile: one(profiles, {
      fields: [writingSubmissions.userId],
      references: [profiles.id],
    }),
    analysisRuns: many(analysisRuns),
  }),
);

export const analysisRunsRelations = relations(analysisRuns, ({ one }) => ({
  submission: one(writingSubmissions, {
    fields: [analysisRuns.submissionId],
    references: [writingSubmissions.id],
  }),
}));

// ---------------------------------------------------------------------------
// Inferred types (existing + Phase 2)
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

// Phase 2 types
export type WritingSubmission = typeof writingSubmissions.$inferSelect;
export type NewWritingSubmission = typeof writingSubmissions.$inferInsert;
export type AnalysisRun = typeof analysisRuns.$inferSelect;
export type NewAnalysisRun = typeof analysisRuns.$inferInsert;

// ---------------------------------------------------------------------------
// classes — teacher-managed classroom groups (Phase 4)
// ---------------------------------------------------------------------------
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// class_students — many-to-many join between classes and students (Phase 4)
// ---------------------------------------------------------------------------
export const classStudents = pgTable("class_students", {
  id: serial("id").primaryKey(),
  classId: integer("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
});

// ---------------------------------------------------------------------------
// assignments — figure assignments from teachers to students (Phase 4)
// ---------------------------------------------------------------------------
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  classId: integer("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  figureId: integer("figure_id")
    .notNull()
    .references(() => figures.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  assignedBy: uuid("assigned_by")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ---------------------------------------------------------------------------
// Relations — Phase 4 additions
// ---------------------------------------------------------------------------
export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(profiles, {
    fields: [classes.teacherId],
    references: [profiles.id],
  }),
  classStudents: many(classStudents),
  assignments: many(assignments),
}));

export const classStudentsRelations = relations(
  classStudents,
  ({ one }) => ({
    class: one(classes, {
      fields: [classStudents.classId],
      references: [classes.id],
    }),
    student: one(profiles, {
      fields: [classStudents.studentId],
      references: [profiles.id],
    }),
  }),
);

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  class: one(classes, {
    fields: [assignments.classId],
    references: [classes.id],
  }),
  figure: one(figures, {
    fields: [assignments.figureId],
    references: [figures.id],
  }),
  student: one(profiles, {
    fields: [assignments.studentId],
    references: [profiles.id],
  }),
  assignedByUser: one(profiles, {
    fields: [assignments.assignedBy],
    references: [profiles.id],
  }),
}));

// Phase 4 types
export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
export type ClassStudent = typeof classStudents.$inferSelect;
export type NewClassStudent = typeof classStudents.$inferInsert;
export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = typeof assignments.$inferInsert;
