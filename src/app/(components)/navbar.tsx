import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  return (
    <nav className="flex w-full max-w-4xl items-center justify-between border-b p-4">
      <h1 className="text-3xl font-bold">Pirates Sports Club - Admin Page</h1>
      <ModeToggle />
    </nav>
  )
}
