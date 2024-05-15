import {
  insertSpaceSchema,
  type Collection,
  type InsertSpace,
  type Space,
} from "@/drizzle/schema";
import { collectionService } from "@/resources/collection";
import { organizationService } from "@/resources/organization";
import { spaceService } from "@/resources/space";
import { type Context } from "hono";
import { z } from "zod";

export const spaceHandler = {
  async getSpaces(c: Context): Promise<Partial<Space>[]> {
    try {
      const queries = c.req.query();
      const { offset, limit } = await c.get("pagination");

      const sort = queries.sort || "createdAt";
      const order = (queries.order || "asc") as "asc" | "desc";

      const spaces = await spaceService.getSpaces({
        offset,
        limit,
        sort,
        order,
      });
      if (!spaces) {
        throw new Error("Spaces not found");
      }

      return spaces;
    } catch (error: any) {
      throw error;
    }
  },

  async createSpace(c: Context): Promise<Space> {
    try {
      const body = (await c.req.parseBody()) as unknown as InsertSpace;
      const result = insertSpaceSchema.parse(body);
      if (!result) {
        throw new Error("Invalid data provided");
      }

      const isOrganizationExists = await organizationService.getOrganization(
        result.organizationId
      );

      if (!isOrganizationExists) {
        throw new Error("Organization not found");
      }

      const space = await spaceService.createSpace(result);
      if (!space) {
        throw new Error("Space not created");
      }

      return space;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        throw error;
      }

      throw error;
    }
  },

  async getSpace(c: Context): Promise<Space> {
    try {
      const spaceId = c.req.param("spaceId");
      if (!spaceId) {
        throw new Error("Space ID not provided");
      }

      const space = await spaceService.getSpace(spaceId);
      if (!space) {
        throw new Error("Space not found");
      }

      return space;
    } catch (error: any) {
      throw error;
    }
  },

  async getCollectionsBySpace(c: Context): Promise<Partial<Collection>[]> {
    try {
      const spaceId = c.req.param("spaceId");
      const { limit, offset } = c.get("pagination");
      if (!spaceId) {
        throw new Error("Space ID not provided");
      }

      const collections = await collectionService.getCollectionsBySpace(
        spaceId,
        limit,
        offset
      );
      if (!collections) {
        throw new Error("Collections not found");
      }
      return collections;
    } catch (error: any) {
      throw error;
    }
  },
};
