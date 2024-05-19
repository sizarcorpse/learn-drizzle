DO $$ BEGIN
 CREATE TYPE "public"."access" AS ENUM('public', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(100) NOT NULL,
	"isBookmarked" boolean DEFAULT false NOT NULL,
	"spaceId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collectionTag" (
	"collectionId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "pk_collectionTag_collectionId_tagId" PRIMARY KEY("collectionId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(33) NOT NULL,
	"logo" varchar(255) NOT NULL,
	CONSTRAINT "uq_organization_name" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "space" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(33) NOT NULL,
	"access" "access" DEFAULT 'public' NOT NULL,
	"organizationId" uuid NOT NULL,
	CONSTRAINT "uniqueSpaceName" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tab" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"icon" varchar(500),
	"title" varchar(500) NOT NULL,
	"description" varchar(500),
	"url" varchar(500) NOT NULL,
	"path" varchar(500),
	"collectionId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(100) NOT NULL,
	"color" char(7),
	CONSTRAINT "uq_tag_name" UNIQUE("name"),
	CONSTRAINT "uq_tag_name_color" UNIQUE("name","color")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection" ADD CONSTRAINT "collection_spaceId_space_id_fk" FOREIGN KEY ("spaceId") REFERENCES "public"."space"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionTag" ADD CONSTRAINT "collectionTag_collectionId_collection_id_fk" FOREIGN KEY ("collectionId") REFERENCES "public"."collection"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionTag" ADD CONSTRAINT "collectionTag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "space" ADD CONSTRAINT "space_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tab" ADD CONSTRAINT "tab_collectionId_collection_id_fk" FOREIGN KEY ("collectionId") REFERENCES "public"."collection"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_collection_spaceId" ON "collection" ("spaceId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_collectionTag_collectionId" ON "collectionTag" ("collectionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_collectionTag_TagId" ON "collectionTag" ("tagId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_space_organizationId" ON "space" ("organizationId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_tab_collectionId" ON "tab" ("collectionId");