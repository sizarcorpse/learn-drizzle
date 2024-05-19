import { db } from "@/drizzle/db";
import {
  CollectionTable,
  CollectionTagTable,
  InsertCollection,
  SpaceTable,
  TagTable,
} from "@/drizzle/schema";
import "dotenv/config";
import { asc, eq } from "drizzle-orm";

export const collectionService = {
  async getCollections(limit: number, offset: number) {
    try {
      const collections = await db
        .select()
        .from(CollectionTable)
        .orderBy(asc(CollectionTable.name))
        .limit(limit)
        .offset(offset);

      return collections;
    } catch (error) {
      throw error;
    }
  },

  async createCollection(entry: InsertCollection) {
    try {
      // random spaceId

      const spaces = await db
        .select({ spaceId: SpaceTable.id })
        .from(SpaceTable);

      if (!spaces) {
        throw new Error("Spaces not found");
      }
      const randomIndex = Math.floor(Math.random() * spaces.length);
      if (!randomIndex) {
        throw new Error("Space not found");
      }
      const spaceId = spaces[randomIndex]?.spaceId;
      if (!spaceId) {
        throw new Error("Space not found");
      }

      // delete after testing
      const collection = await db
        .insert(CollectionTable)
        .values({
          name: entry.name,
          // spaceId: entry.spaceId,
          spaceId: spaceId,
        })
        .onConflictDoNothing()
        .returning();

      return collection[0];
    } catch (error) {
      throw error;
    }
  },

  async getCollection(collectionId: string) {
    try {
      const collection = await db
        .select()
        .from(CollectionTable)
        .where(eq(CollectionTable.id, collectionId));

      return collection[0];
    } catch (error) {
      throw error;
    }
  },

  async getCollectionsBySpace(spaceId: string, limit: number, offset: number) {
    try {
      const prepared = db.query.CollectionTable.findMany({
        where: (c, { eq }) => eq(c.spaceId, spaceId),
        with: {
          collectionTag: {
            columns: {},
            with: {
              tag: true,
            },
            limit: 10,
          },
        },
      }).prepare("getCollectionsBySpace");

      const collections = await prepared.execute();

      const collectionsWithTags = collections.map((collection) => {
        const tags = collection.collectionTag.map((tag) => tag.tag);

        return {
          ...collection,
          collectionTag: tags,
        };
      });

      return collectionsWithTags;
    } catch (error) {
      throw error;
    }
  },

  async addTagToCollection(collectionId: string, tagId: string) {
    try {
      const collectionTag = await db
        .insert(CollectionTagTable)
        .values({
          collectionId,
          tagId,
        })
        .onConflictDoNothing()
        .returning();

      if (!collectionTag || !collectionTag[0]) {
        throw new Error("Collection tag not created");
      }

      const collection = await db
        .select()
        .from(CollectionTable)
        .where(eq(CollectionTable.id, collectionTag[0].collectionId));

      const tag = await db
        .select()
        .from(TagTable)
        .where(eq(TagTable.id, collectionTag[0].tagId));

      if (!collection || !tag) {
        throw new Error("Collection or tag not found");
      }

      return {
        collection: collection[0],
        tag: tag[0],
      };
    } catch (error) {
      throw error;
    }
  },
};
