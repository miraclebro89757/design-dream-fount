import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Learning Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            {'Don\'t let "I want to learn" stay just a thought'}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Set a plan, do a review, earn rewards, and share growth templates with like-minded people
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Create Your Learning Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
