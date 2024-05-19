import { collectionHandler } from "@/handlers/collection";
import { organizationHandler } from "@/handlers/organization";
import { spaceHandler } from "@/handlers/space";
import { tagHandler } from "@/handlers/tag";
import { pagination } from "@/middlewares/pagination";
import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";

type Variables = {
  pagination: {
    limit: number;
    offset: number;
  };
};

const app = new Hono<{
  Variables: Variables;
}>();

const organization = new Hono();
const space = new Hono();
const collection = new Hono();
const tag = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello, Drizzle" });
});

app.use(pagination);

// Organization
organization.get("/", async (c) => {
  const organizations = await organizationHandler.getOrganizations(c);
  return c.json({
    message: "Organizations",
    organizations,
  });
});

organization.post("/", async (c) => {
  const organization = await organizationHandler.createOrganization(c);
  return c.json({
    message: "Organization created",
    organization,
  });
});

organization.get("/:organizationId", async (c) => {
  const organization = await organizationHandler.getOrganization(c);
  return c.json({
    message: "Organization",
    organization,
  });
});

organization.delete("/:organizationId", async (c) => {
  const organization = await organizationHandler.deleteOrganization(c);

  return c.json({
    message: "Organization deleted",
    organization,
  });
});

organization.get("/:organizationId/spaces", async (c) => {
  const spaces = await organizationHandler.getSpacesByOrganization(c);
  return c.json({
    message: "Spaces",
    spaces,
  });
});

// Space
space.get("/", async (c) => {
  const spaces = await spaceHandler.getSpaces(c);
  return c.json({
    message: "Spaces",
    spaces,
  });
});

space.post("/", async (c) => {
  const space = await spaceHandler.createSpace(c);
  return c.json({
    message: "Space created",
    space,
  });
});

space.get("/:spaceId", async (c) => {
  const space = await spaceHandler.getSpace(c);
  return c.json({
    message: "Space",
    space,
  });
});

space.get("/:spaceId/collections", async (c) => {
  const collections = await spaceHandler.getCollectionsBySpace(c);
  return c.json({
    message: "Collections",
    collections,
  });
});

// collection
collection.post("/", async (c) => {
  const collection = await collectionHandler.createCollection(c);
  return c.json({
    message: "Collection created",
    collection,
  });
});
collection.get("/", async (c) => {
  const collections = await collectionHandler.getCollections(c);
  return c.json({
    message: "Collections",
    collections,
  });
});
collection.get("/:collectionId", async (c) => {
  const collection = await collectionHandler.getCollection(c);
  return c.json({
    message: "Collection",
    collection,
  });
});

collection.post("/:collectionId/tags/:tagId", async (c) => {
  const collection = await collectionHandler.addTagToCollection(c);
  return c.json({
    message: "Tag added to collection",
    collection,
  });
});

//tags
tag.post("/", async (c) => {
  const tag = await tagHandler.createTag(c);
  return c.json({
    message: "Tag created",
    tag,
  });
});

tag.get("/", async (c) => {
  const tags = await tagHandler.getTags(c);
  return c.json({
    message: "Tags",
    tags,
  });
});

//app route
app.route("/organizations", organization);
app.route("/spaces", space);
app.route("/collections", collection);
app.route("/tags", tag);

app.onError((e, c) => {
  return c.json({
    message: e.message,
  });
});

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});
