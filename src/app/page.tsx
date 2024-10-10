import Link from "next/link"
import { InstaPostProvider } from "@/context/instaPostContext"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

import AddPostForm from "./(components)/addPostForm"
import InstaPostList from "./(components)/instaPostList"

export default function Home() {
  return (
    <InstaPostProvider page="home">
      <main className="container mx-auto min-h-screen w-full max-w-4xl space-y-10 bg-background p-4 text-foreground">
        <AddPostForm />
        <InstaPostList />
      </main>
    </InstaPostProvider>
  )
}
