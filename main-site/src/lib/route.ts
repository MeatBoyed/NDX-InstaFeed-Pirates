import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/db"
import { InstagramFeed } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { pagesEnum } from "../app/api/insta-feed/route"

const queryPayload = z.object({
  index: z.coerce.number(),
  page: pagesEnum,
})
const AddPostResponse = z.object({
  data: z.string().url(),
})
// export type InstaServicePayload = z.infer<typeof payloadSchema>
export type InstaServiceResponse = z.infer<typeof AddPostResponse>

export async function GET(
  req: NextRequest
): Promise<NextResponse<InstaServiceResponse>> {
  const page = req.nextUrl.searchParams.get("page")
  const index = req.nextUrl.searchParams.get("index")

  const {
    success,
    error,
    data: payload,
  } = queryPayload.safeParse({ page, index })
  if (!success) {
    let errorMessages: string = ""
    error.errors.map((error) => (errorMessages += error.message + ". "))
    console.log("Error Message: ", errorMessages)
    return NextResponse.json({ data: "" }, { status: 400 })
  }

  console.log("Query Payload: ", payload)

  try {
    const existingFeed = await db
      .select()
      .from(InstagramFeed)
      .where(eq(InstagramFeed.page, payload.page))
    const posts = existingFeed[0].posts
    // console.log("Feed: ", existingFeed)
    if (!posts || !posts[payload.index])
      return NextResponse.json({ data: "" }, { status: 404 })
    return NextResponse.json(
      {
        data: posts[payload.index],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        data: "",
      },
      { status: 500 }
    )
  }
}
