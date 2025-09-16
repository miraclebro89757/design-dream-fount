import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, BookOpen, Users, BarChart3, Lightbulb, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DreamBuilder
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20">
            Transform Dreams into Reality
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight text-balance">
            Design and Live Your Dreams
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Create personalized learning plans, track your progress, and turn your aspirations into achievable goals
            with our innovative dream-building platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8"
              >
                Start Building Dreams
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful tools and features designed to help you plan, track, and achieve your dreams
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Dream Builder</CardTitle>
                <CardDescription>
                  Create structured plans that break down your biggest dreams into actionable steps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Plan Manager</CardTitle>
                <CardDescription>
                  Organize, edit, and track all your learning plans and goals in one beautiful dashboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Review & Archive</CardTitle>
                <CardDescription>
                  Store your achievements, notes, and progress with our comprehensive archive system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with fellow dreamers, share your journey, and get inspired by others
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>
                  Get personalized recommendations and insights powered by advanced AI analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Visualize your growth with beautiful charts and comprehensive progress analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dream Flow Diagram */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Your Journey to Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Follow our proven process to transform your dreams into reality
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {[
              { icon: Lightbulb, title: "Dream", desc: "Envision your goals" },
              { icon: Target, title: "Plan", desc: "Create actionable steps" },
              { icon: CheckCircle, title: "Actions", desc: "Execute your plan" },
              { icon: BarChart3, title: "Review", desc: "Track your progress" },
              { icon: BookOpen, title: "Achievements", desc: "Celebrate success" },
              { icon: Users, title: "Inspire Others", desc: "Share your journey" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
                {index < 5 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground mt-4 lg:mt-0 lg:ml-8 lg:absolute lg:translate-x-20 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section id="templates" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Get Started with Templates</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Jump-start your journey with our curated collection of dream templates
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Career Growth", desc: "Advance your professional journey", category: "Professional" },
              { title: "Learn New Skills", desc: "Master new abilities and knowledge", category: "Education" },
              { title: "Health & Fitness", desc: "Transform your physical wellbeing", category: "Wellness" },
              { title: "Creative Projects", desc: "Bring your artistic visions to life", category: "Creative" },
              { title: "Financial Goals", desc: "Build wealth and financial freedom", category: "Finance" },
              { title: "Travel Adventures", desc: "Explore the world and new cultures", category: "Lifestyle" },
            ].map((template, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Copy & Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/templates">
              <Button size="lg" variant="outline">
                View All Templates
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section id="community" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Join Our Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Connect with thousands of dreamers who are turning their aspirations into reality
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                achievement: "Launched her own design studio",
                quote: "DreamBuilder helped me structure my entrepreneurial journey step by step.",
              },
              {
                name: "Marcus Rodriguez",
                achievement: "Learned 3 programming languages",
                quote: "The progress tracking kept me motivated throughout my coding journey.",
              },
              {
                name: "Emma Thompson",
                achievement: "Completed a marathon",
                quote: "Breaking down my fitness goals made the impossible feel achievable.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-card to-muted/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.achievement}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Build Your Dreams?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of dreamers who are already transforming their lives with DreamBuilder
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DreamBuilder
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DreamBuilder. All rights reserved. Built with passion for dreamers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
