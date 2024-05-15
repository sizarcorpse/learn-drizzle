import { db } from "@/drizzle/db";
import { InsertSpace, SpaceTable } from "@/drizzle/schema";
import "dotenv/config";
import { asc, eq } from "drizzle-orm";

export const spaceService = {
  async getSpaces(params: {
    offset: number;
    limit: number;
    sort: string;
    order: "asc" | "desc";
  }) {
    try {
      const { offset, limit } = params;

      const organizations = await db
        .select()
        .from(SpaceTable)
        .orderBy(asc(SpaceTable.name))
        .limit(limit)
        .offset(offset);
      return organizations;
    } catch (error) {
      throw error;
    }
  },

  async createSpace(entry: InsertSpace) {
    try {
      const space = await db
        .insert(SpaceTable)
        .values({
          name: entry.name,
          organizationId: entry.organizationId,
        })
        .onConflictDoNothing()
        .returning();

      return space[0];
    } catch (error) {
      throw error;
    }
  },

  async getSpacesByOrganization(
    organizationId: string,
    limit: number,
    offset: number
  ) {
    try {
      const spaces = await db
        .select()
        .from(SpaceTable)
        .where(eq(SpaceTable.organizationId, organizationId))
        .limit(limit)
        .offset(offset);

      return spaces;
    } catch (error) {
      throw error;
    }
  },

  async getSpace(spaceId: string) {
    try {
      const space = await db
        .select()
        .from(SpaceTable)
        .where(eq(SpaceTable.id, spaceId));

      return space[0];
    } catch (error) {
      throw error;
    }
  },
};
