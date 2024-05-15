import {
  boolean,
  char,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const SpaceAccessEnum = pgEnum("access", ["public", "private"]);

export const OrganizationTable = pgTable(
  "organization",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    name: varchar("name", {
      length: 33,
    }).notNull(),
    logo: varchar("logo", {
      length: 255,
    }).notNull(),
  },
  (table) => ({
    uqOrganizationName: unique("uq_organization_name").on(table.name),
  })
);

export const insertOrganizationSchema = createInsertSchema(OrganizationTable, {
  name: () => z.string().min(3).max(33),
  logo: () => z.string().url(),
});
export type Organization = typeof OrganizationTable.$inferSelect;
export type InsertOrganization = typeof OrganizationTable.$inferInsert;

export const SpaceTable = pgTable(
  "space",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    name: varchar("name", {
      length: 33,
    })
      .notNull()
      .unique("uniqueSpaceName"),
    access: SpaceAccessEnum("access").notNull().default("public"),
    organizationId: uuid("organizationId")
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    idxSpaceOrganizationId: index("idx_space_organizationId").on(
      table.organizationId
    ),
  })
);

export const insertSpaceSchema = createInsertSchema(SpaceTable, {
  name: () => z.string().min(3).max(33),
});
export type Space = typeof SpaceTable.$inferSelect;
export type InsertSpace = typeof SpaceTable.$inferInsert;

export const CollectionTable = pgTable(
  "collection",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    name: varchar("name", {
      length: 100,
    }).notNull(),
    isBookmarked: boolean("isBookmarked").notNull().default(false),
    spaceId: uuid("spaceId")
      .references(() => SpaceTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({
    idxCollectionSpaceId: index("idx_collection_spaceId").on(t.spaceId),
  })
);

export const insertCollectionSchema = createInsertSchema(CollectionTable, {
  name: () => z.string().min(3).max(100),
});
export type Collection = typeof CollectionTable.$inferSelect;
export type InsertCollection = typeof CollectionTable.$inferInsert;

export const TabTable = pgTable(
  "tab",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    icon: varchar("icon", {
      length: 500,
    }),
    title: varchar("title", {
      length: 500,
    }).notNull(),
    description: varchar("description", {
      length: 500,
    }),
    url: varchar("url", {
      length: 500,
    }).notNull(),
    path: varchar("path", {
      length: 500,
    }),
    collectionId: uuid("collectionId")
      .references(() => CollectionTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({
    idxTabCollectionId: index("idx_tab_collectionId").on(t.collectionId),
  })
);

export const TagTable = pgTable(
  "tag",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    name: varchar("name", {
      length: 100,
    }).notNull(),
    color: char("color", {
      length: 7,
    }),
  },
  (t) => ({
    uqTagName: unique("uq_tag_name").on(t.name),
    uqTagNameColor: unique("uq_tag_name_color").on(t.name, t.color),
  })
);

export const insertTagSchema = createInsertSchema(TagTable, {
  name: () => z.string().min(3).max(100),
  color: () => z.string().length(7),
});
export type Tag = typeof TagTable.$inferSelect;
export type InsertTag = typeof TagTable.$inferInsert;

export const CollectionTagTable = pgTable(
  "collectionTag",
  {
    collectionId: uuid("collectionId")
      .references(() => CollectionTable.id, { onDelete: "cascade" })
      .notNull(),
    tagId: uuid("tagId")
      .references(() => TagTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pkCollectionTag: primaryKey({
      name: "pk_collectionTag",
      columns: [table.collectionId, table.tagId],
    }),
    idxCollectionTagCollectionId: index("idx_collectionTag_collectionId").on(
      table.collectionId
    ),
    idxCollectionTagTagId: index("idx_collectionTag_TagId").on(table.tagId),
  })
);

export const insertCollectionTagSchema = createInsertSchema(CollectionTagTable);
export type CollectionTag = typeof CollectionTagTable.$inferSelect;
export type InsertCollectionTag = typeof CollectionTagTable.$inferInsert;
