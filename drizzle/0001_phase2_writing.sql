CREATE TABLE "writing_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"locale" varchar(10) DEFAULT 'es' NOT NULL,
	"title" varchar(255),
	"raw_text" text NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analysis_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_id" integer NOT NULL,
	"model" varchar(100) NOT NULL,
	"locale" varchar(10) DEFAULT 'es' NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"confidence" integer DEFAULT 0,
	"analysis_json" jsonb,
	"feedback_json" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "writing_submissions" ADD CONSTRAINT "writing_submissions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analysis_runs" ADD CONSTRAINT "analysis_runs_submission_id_writing_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."writing_submissions"("id") ON DELETE cascade ON UPDATE no action;
