"use client"

import { useMemo } from "react"
import { useInstaPostContext } from "@/context/instaPostContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { InstagramEmbed } from "react-social-media-embed"

import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function InstaPostList() {
  const { posts } = useInstaPostContext()

  const instagramPosts = useMemo(
    () => posts.map((post, index) => <InstaPost post={post} key={index} />),
    [posts]
  )

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-5">
      <CardTitle>Instagram Posts</CardTitle>
      <ScrollArea className="h-[600px] w-full">
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">
            No posts added yet.
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {instagramPosts}
        </div>
      </ScrollArea>
    </div>
  )
}

function InstaPost({ post }: { post: string }) {
  const { handleRemovePost } = useInstaPostContext()

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="max-h-[400px] w-full md:max-h-[500px]"
      >
        <InstagramEmbed url={post} width="100%" height={"100%"} />
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleRemovePost(post)}
        className="w-full"
      >
        Remove
      </Button>
      <div className="flex w-full items-center justify-center space-x-4">
        <Button variant={"outline"} size={"icon"}>
          <ChevronLeft />
        </Button>
        <Button variant={"outline"} size="icon">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
