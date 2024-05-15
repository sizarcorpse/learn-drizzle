import { insertTagSchema, type InsertTag, type Tag } from "@/drizzle/schema";
import { collectionService } from "@/resources/collection";
import { organizationService } from "@/resources/organization";
import { spaceService } from "@/resources/space";
import { tagService } from "@/resources/tag";
import { type Context } from "hono";
import { z } from "zod";

export const tagHandler = {
  async getTags(c: Context): Promise<Partial<Tag>[]> {
    try {
      const queries = c.req.query();
      const { offset, limit } = await c.get("pagination");

      const tags = await tagService.getTags(limit, offset);
      if (!tags) {
        throw new Error("Tags not found");
      }

      return tags;
    } catch (error: any) {
      throw error;
    }
  },

  async createTag(c: Context): Promise<Tag> {
    try {
      const body = (await c.req.parseBody()) as unknown as InsertTag;
      const result = insertTagSchema.parse(body);
      if (!result) {
        throw new Error("Invalid data provided");
      }

      const tag = await tagService.createTag(result);
      if (!tag) {
        throw new Error("Tag not created");
      }

      return tag;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        throw error;
      }

      throw error;
    }
  },
};
