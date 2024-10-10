"use client"

import { useState } from "react"
import { useInstaPostContext } from "@/context/instaPostContext"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AddPostForm() {
  const [newPostUrl, setNewPostUrl] = useState("")
  const { handleAddPost } = useInstaPostContext()

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await handleAddPost(newPostUrl)
  }

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-5">
      <CardTitle>Add Instagram Posts for the Home Page</CardTitle>
      <form
        onSubmit={submitHandler}
        className="flex w-full space-x-2 md:space-x-5"
      >
        <Input
          type="url"
          placeholder="Enter Instagram post URL"
          value={newPostUrl}
          onChange={(e) => setNewPostUrl(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Add Post</Button>
      </form>
    </div>
  )
}
