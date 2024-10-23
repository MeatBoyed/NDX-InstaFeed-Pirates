import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/db"
import { InstagramFeed } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { pagesEnum, InstaServiceResponse, payloadSchema } from "@/lib/utils"

export async function GET(
  req: NextRequest
): Promise<NextResponse<InstaServiceResponse>> {
  const query = req.nextUrl.searchParams.get("page")

  const { success, error, data: payload } = pagesEnum.safeParse(query)
  if (!success) {
    let errorMessages: string = ""
    error.errors.map((error) => (errorMessages += error.message + ". "))
    return NextResponse.json({ message: errorMessages }, { status: 400 })
  }

  try {
    const existingFeed = await db
      .select()
      .from(InstagramFeed)
      .where(eq(InstagramFeed.page, payload))
    // console.log("Feed: ", existingFeed)
    if (!existingFeed[0].posts)
      return NextResponse.json({ message: "Error finding Feed" })
    return NextResponse.json(
      {
        posts: existingFeed[0].posts,
        message: "Instagram feed created",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: "Failed to create Instagram feed",
      },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<InstaServiceResponse>> {
  const body = await req.json()

  const { success, error, data: payload } = payloadSchema.safeParse(body)
  if (!success) {
    let errorMessages: string = ""
    error.errors.map((error) => (errorMessages += error.message + ". "))
    return NextResponse.json({ message: errorMessages }, { status: 400 })
  }

  try {
    const newFeed = await db
      .update(InstagramFeed)
      .set({ posts: payload.posts })
      .where(eq(InstagramFeed.page, payload.page))

    return NextResponse.json(
      {
        message: "Instagram feed created",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: "Failed to create Instagram feed",
      },
      { status: 500 }
    )
  }
}
