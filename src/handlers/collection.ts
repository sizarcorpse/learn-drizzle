import {
  Tag,
  insertCollectionSchema,
  type Collection,
  type CollectionTag,
  type InsertCollection,
} from "@/drizzle/schema";
import { collectionService } from "@/resources/collection";
import { organizationService } from "@/resources/organization";
import { spaceService } from "@/resources/space";
import { tagService } from "@/resources/tag";
import { type Context } from "hono";
import { z } from "zod";

export const collectionHandler = {
  async getCollections(c: Context): Promise<Partial<Collection>[]> {
    try {
      const queries = c.req.query();
      const { offset, limit } = await c.get("pagination");

      const collections = await collectionService.getCollections(limit, offset);
      if (!collections) {
        throw new Error("Collections not found");
      }

      return collections;
    } catch (error: any) {
      throw error;
    }
  },

  async createCollection(c: Context): Promise<Collection> {
    try {
      const body = (await c.req.parseBody()) as unknown as InsertCollection;
      const result = insertCollectionSchema.parse(body);
      if (!result) {
        throw new Error("Invalid data provided");
      }

      const isSpaceExists = await spaceService.getSpace(result.spaceId);

      if (!isSpaceExists) {
        throw new Error("Space not found");
      }

      const collection = await collectionService.createCollection(result);
      if (!collection) {
        throw new Error("Collection not created");
      }

      return collection;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        throw error;
      }

      throw error;
    }
  },

  async getCollection(c: Context): Promise<Collection> {
    try {
      const collectionId = c.req.param("collectionId");
      if (!collectionId) {
        throw new Error("Collection ID not provided");
      }

      const collection = await collectionService.getCollection(collectionId);
      if (!collection) {
        throw new Error("Collection not found");
      }

      return collection;
    } catch (error: any) {
      throw error;
    }
  },

  async addTagToCollection(c: Context): Promise<
    | {
        Collection: Collection | undefined;
        Tag: Tag | undefined;
      }
    | any
  > {
    try {
      const collectionId = c.req.param("collectionId");
      const tagId = c.req.param("tagId");

      const isCollectionExists = await collectionService.getCollection(
        collectionId
      );
      if (!isCollectionExists) {
        throw new Error("Collection not found");
      }

      const isTagExists = await tagService.getTag(tagId);
      if (!isTagExists) {
        throw new Error("Tag not found");
      }

      const collection = await collectionService.addTagToCollection(
        collectionId,
        tagId
      );
      if (!collection) {
        throw new Error("Tag not added to collection");
      }

      return collection;
    } catch (error: any) {
      throw error;
    }
  },
};
