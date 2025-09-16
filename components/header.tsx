"use client"

import { Button } from "@/components/ui/button"
import { Brain, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">LearnTrack</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`transition-colors ${
              pathname === "/" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/create"
            className={`transition-colors ${
              pathname === "/create" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Create Plan
          </Link>
          <Link
            href="/progress"
            className={`transition-colors ${
              pathname === "/progress" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Track Progress
          </Link>
          <Link
            href="/templates"
            className={`transition-colors ${
              pathname === "/templates" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Templates
          </Link>
          <Link
            href="/community"
            className={`transition-colors ${
              pathname === "/community" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Community
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
