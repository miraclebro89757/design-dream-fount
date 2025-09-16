import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, BookTemplate, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning Plans",
    description:
      "Create structured learning plans with AI assistance. Build interactive mind maps with nodes and tasks that guide your learning journey.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress dashboards. Track completion rates and attach outputs to every completed task.",
  },
  {
    icon: BookTemplate,
    title: "Template Library",
    description:
      "Access a curated library of pre-made learning plan templates. Copy and customize templates to jumpstart your learning goals.",
  },
  {
    icon: Users,
    title: "Community Discussion",
    description:
      "Connect with like-minded learners in our community forum. Share experiences, ask questions, and learn from others' journeys.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Transform your learning aspirations into structured achievements with our comprehensive platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
