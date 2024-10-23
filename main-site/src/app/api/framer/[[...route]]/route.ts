import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/db"
import { InstagramFeed } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { pagesEnum } from "@/lib/utils"


const queryPayload = z.object({
  index: z.coerce.number(),
  page: pagesEnum,
})
const AddPostResponse = z.object({
  post: z.string().url(),
})
// export type InstaServicePayload = z.infer<typeof payloadSchema>
type InstaServiceResponse = z.infer<typeof AddPostResponse>

export async function GET(
  req: NextRequest
): Promise<NextResponse<InstaServiceResponse>> {
  const [page, index] = req.nextUrl.pathname.split("/").slice(-2)

  const {
    success,
    error,
    data: payload,
  } = queryPayload.safeParse({ page, index })
  if (!success) {
    let errorMessages: string = ""
    error.errors.map((error) => (errorMessages += error.message + ". "))
    console.log("Error Message: ", errorMessages)
    return NextResponse.json({ post: "" }, { status: 400 })
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
      return NextResponse.json({ post: "" }, { status: 404 })
    return NextResponse.json(
      {
        post: posts[payload.index],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        post: "",
      },
      { status: 500 }
    )
  }
}
