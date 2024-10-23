"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { toast } from "sonner"

import { AddInstaPost, GetInstaPosts } from "@/lib/RequestService"
import { Pages } from "@/lib/utils"

interface InstaPostContextType {
  posts: string[]
  handleAddPost: (url: string) => Promise<void>
  handleRemovePost: (url: string) => void
  handleReOrder: (source: number, destination: number) => void
}

const InstaPostContext = createContext<InstaPostContextType | null>(null)

export const useInstaPostContext = () => {
  const context = useContext(InstaPostContext)
  if (!context) {
    throw new Error(
      "useInstaPostContext must be used within a InstaPostProvider"
    )
  }
  return context
}

export const InstaPostProvider = ({
  children,
  page,
}: {
  page: Pages
  children: React.ReactNode
}) => {
  //   const [posts, setPosts] = useState<InstagramPost[]>([])
  const [posts, setPosts] = useState<string[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const newPosts = await GetInstaPosts(page)
      console.log("New Postss: ", newPosts)
      if (newPosts.posts) setPosts(newPosts.posts)
    }
    fetchPosts()
  }, [])

  const handleAddPost = async (url: string) => {
    const post = posts.find((post) => post === url)
    if (post) {
      toast.error("Woops 👀 Looks like this post is already added")
      return
    }
    toast.promise(AddInstaPost({ posts: [...posts, url], page: page }), {
      loading: "Adding post...",
      success: (res) => {
        console.log("Reponse Data: ", res)
        setPosts([...posts, url])
        return "Yay 🎊 Your post has been added."
      },
      error: (error: Error) => {
        console.log("Error: ", error)
        return `Oops 🤯 Something unexpected happened. ${error.message}. Please try again.`
      },
    })
  }

  const handleRemovePost = (url: string) => {
    const newPosts = posts.filter((post) => post !== url)
    toast.promise(AddInstaPost({ posts: newPosts, page: page }), {
      loading: "Removing post...",
      success: (res) => {
        console.log("Response data: ", res)
        setPosts(newPosts)
        return "Yay 🎊 Your post has been deleted."
      },
      error: (error: Error) => {
        return `Oops 🤯 Something unexpected happened. ${error.message}. Please try again.`
      },
    })
  }

  const handleReOrder = useCallback(
    (source: number, destination: number) => {
      const newPosts = reorder(posts || [], source, destination)
      setPosts(newPosts)
    },
    [posts]
  )

  return (
    <InstaPostContext.Provider
      value={{ posts, handleAddPost, handleRemovePost, handleReOrder }}
    >
      {children}
    </InstaPostContext.Provider>
  )
}

// Handles reordering
export const reorder = (
  list: string[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed || "")
  return result
}
