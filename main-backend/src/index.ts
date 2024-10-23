import { Hono } from "hono";
import { env } from "hono/adapter";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { InstagramFeed } from "./db/schema";
import { instagramFeed } from "../supabase/migrations/schema";
import postgres from "postgres";
import { z } from "zod";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

export const pagesEnum = z.enum(["home", "contact", "about"]);
const queryPayload = z.object({
  index: z.coerce.number(),
  page: pagesEnum,
});

app.get("/:page/:index", async (c) => {
  // Validate Params
  const params = c.req.param();
  const { success, error, data: payload } = queryPayload.safeParse(params);
  if (!success) {
    let errorMessages: string = "";
    error.errors.map((error) => (errorMessages += error.message + ". "));
    // return NextResponse.json({ message: errorMessages }, { status: 400 })
    return c.json({
      status: 400,
    });
  }

  // Init db
  const client = postgres(c.env.DATABASE_URL);
  const db = drizzle(client, { logger: true });

  const existingFeed = await db
    .select()
    .from(InstagramFeed)
    .where(eq(InstagramFeed.page, payload.page));
  const posts = existingFeed[0].posts;
  // console.log("Feed: ", existingFeed)
  if (!posts || !posts[payload.index])
    // return NextResponse.json({ message: "Error finding Feed" })
    return c.json({}, { status: 404 });

  return c.json({
    post: posts[payload.index],
  });
});

async function getPost() {}

export default app;
