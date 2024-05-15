import { db } from "@/drizzle/db";
import { InsertTag, TagTable } from "@/drizzle/schema";
import "dotenv/config";
import { asc, eq } from "drizzle-orm";

export const tagService = {
  async getTags(limit: number, offset: number) {
    try {
      const tags = await db
        .select()
        .from(TagTable)
        .orderBy(asc(TagTable.name))
        .limit(limit)
        .offset(offset);
      return tags;
    } catch (error) {
      throw error;
    }
  },

  async createTag(entry: InsertTag) {
    try {
      const tag = await db
        .insert(TagTable)
        .values({
          name: entry.name,
          color: entry.color,
        })
        .onConflictDoNothing()
        .returning();

      return tag[0];
    } catch (error) {
      throw error;
    }
  },

  async getTag(tagId: string) {
    try {
      const tag = await db
        .select()
        .from(TagTable)
        .where(eq(TagTable.id, tagId));

      return tag[0];
    } catch (error) {
      throw error;
    }
  },
};
