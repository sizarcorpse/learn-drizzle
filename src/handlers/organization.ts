import {
  Organization,
  insertOrganizationSchema,
  type InsertOrganization,
  type Space,
} from "@/drizzle/schema";
import { organizationService } from "@/resources/organization";
import { spaceService } from "@/resources/space";
import { type Context } from "hono";

import { z } from "zod";

export const organizationHandler = {
  async getOrganizations(c: Context): Promise<Partial<Organization>[]> {
    try {
      const queries = c.req.query();
      const { offset, limit } = await c.get("pagination");

      const sort = queries.sort || "createdAt";
      const order = (queries.order || "asc") as "asc" | "desc";

      const organizations = await organizationService.getOrganizations({
        offset,
        limit,
        sort,
        order,
      });
      if (!organizations) {
        throw new Error("Organizations not found");
      }

      return organizations;
    } catch (error: any) {
      throw error;
    }
  },

  async createOrganization(c: Context): Promise<Organization> {
    try {
      const body = (await c.req.parseBody()) as unknown as InsertOrganization;
      const result = insertOrganizationSchema.parse(body);
      if (!result) {
        throw new Error("Invalid data provided");
      }

      const organization = await organizationService.createOrganization(result);
      if (!organization) {
        throw new Error("Organization not created");
      }

      return organization;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        throw error;
      }

      throw error;
    }
  },

  async getOrganization(c: Context): Promise<Organization> {
    try {
      const organizationId = c.req.param("organizationId");
      const organization = await organizationService.getOrganization(
        organizationId
      );
      if (!organization) {
        throw new Error("Organization not found");
      }

      return organization;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteOrganization(c: Context): Promise<Organization> {
    try {
      const organizationId = c.req.param("organizationId");

      const organization = await organizationService.deleteOrganization(
        organizationId
      );
      if (!organization) {
        throw new Error("Organization not found");
      }

      return organization;
    } catch (error: any) {
      throw error;
    }
  },

  async getSpacesByOrganization(c: Context): Promise<Partial<Space>[]> {
    try {
      const organizationId = c.req.param("organizationId");
      const { limit, offset } = await c.get("pagination");

      const spaces = await spaceService.getSpacesByOrganization(
        organizationId,
        limit,
        offset
      );
      if (!spaces) {
        throw new Error("Spaces not found");
      }

      return spaces;
    } catch (error: any) {
      throw error;
    }
  },
};
