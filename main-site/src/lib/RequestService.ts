import {
  InstaServicePayload,
  InstaServiceResponse,
  Pages,
} from "@/app/api/insta-feed/route"

export async function AddInstaPost({
  posts,
  page,
}: InstaServicePayload): Promise<InstaServiceResponse> {
  const res = await fetch("/api/insta-feed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      posts: posts,
      page: page,
    }),
  })
  const data = (await res.json()) as InstaServiceResponse

  console.log("Response: ", res)
  if (!res.ok) {
    console.log("Response: ", res)
    throw new Error(data.message)
  }
  return data
}

export async function GetInstaPosts(
  page: Pages
): Promise<InstaServiceResponse> {
  const res = await fetch(`/api/insta-feed?page=${page}`)
  const data = (await res.json()) as InstaServiceResponse

  if (!res.ok) {
    console.log("Response: ", res)
    throw new Error(data.message)
  }
  return data
}
