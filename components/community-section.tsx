import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, TrendingUp } from "lucide-react"

const templates = [
  {
    title: "Full-Stack Developer Path",
    author: "Alex Kim",
    category: "Programming",
    duration: "6 months",
    users: 1240,
    image: "/coding-workspace.png",
  },
  {
    title: "Digital Marketing Mastery",
    author: "Maria Santos",
    category: "Marketing",
    duration: "4 months",
    users: 890,
    image: "/marketing-dashboard.png",
  },
  {
    title: "Data Science Fundamentals",
    author: "David Park",
    category: "Data Science",
    duration: "8 months",
    users: 2100,
    image: "/data-visualization-abstract.png",
  },
]

export function CommunitySection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn from the community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover proven learning templates shared by successful learners in your field
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    {template.users}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                <CardDescription className="text-sm">
                  by {template.author} • {template.duration}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
            <BookOpen className="mr-2 h-5 w-5" />
            Explore All Templates
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50K+</h3>
            <p className="text-muted-foreground">Active Learners</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">2,500+</h3>
            <p className="text-muted-foreground">Learning Templates</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">95%</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
