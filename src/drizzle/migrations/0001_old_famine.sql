CREATE TABLE IF NOT EXISTS "collectionTag" (
	"collectionId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "pk_collectionTag" PRIMARY KEY("collectionId","tagId")
);
--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "spaceId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "space" ADD COLUMN "organizationId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "tab" ADD COLUMN "collectionId" uuid NOT NULL;--> statement-breakpoint
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
CREATE INDEX IF NOT EXISTS "idx_collectionTag_collectionId" ON "collectionTag" ("collectionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_collectionTag_TagId" ON "collectionTag" ("tagId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection" ADD CONSTRAINT "collection_spaceId_space_id_fk" FOREIGN KEY ("spaceId") REFERENCES "public"."space"("id") ON DELETE cascade ON UPDATE no action;
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
CREATE INDEX IF NOT EXISTS "idx_space_organizationId" ON "space" ("organizationId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_tab_collectionId" ON "tab" ("collectionId");