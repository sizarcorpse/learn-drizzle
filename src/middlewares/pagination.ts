import { createMiddleware } from "hono/factory";

export const pagination = createMiddleware(async (c, next) => {
  const params = c.req.query();
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const offset = (page - 1) * limit;

  c.set("pagination", {
    limit,
    offset,
  });
  await next();
});
