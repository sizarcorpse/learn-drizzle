import { db } from "@/drizzle/db";
import { InsertOrganization, OrganizationTable } from "@/drizzle/schema";
import "dotenv/config";
import { asc, count, eq } from "drizzle-orm";

export const organizationService = {
  async getOrganizations(params: {
    offset: number;
    limit: number;
    sort: string;
    order: "asc" | "desc";
  }) {
    try {
      const { offset, limit } = params;

      const organizations = await db
        .select()
        .from(OrganizationTable)
        .orderBy(asc(OrganizationTable.name))
        .limit(limit)
        .offset(offset);
      return organizations;
    } catch (error) {
      throw error;
    }
  },

  async createOrganization(entry: InsertOrganization) {
    try {
      const organization = await db
        .insert(OrganizationTable)
        .values({
          name: entry.name,
          logo: entry.logo,
        })
        .onConflictDoNothing()
        .returning();

      return organization[0];
    } catch (error) {
      throw error;
    }
  },

  async getOrganization(organizationId: string) {
    try {
      const organization = await db
        .select()
        .from(OrganizationTable)
        .where(eq(OrganizationTable.id, organizationId));

      return organization[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteOrganization(organizationId: string) {
    try {
      const organization = await db
        .delete(OrganizationTable)
        .where(eq(OrganizationTable.id, organizationId))
        .returning();

      return organization[0];
    } catch (error) {
      throw error;
    }
  },
};
