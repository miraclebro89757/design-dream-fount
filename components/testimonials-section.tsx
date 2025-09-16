import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: "/professional-woman-diverse.png",
    content:
      "LearnTrack transformed how I approach skill development. The AI-generated learning paths are incredibly accurate and the community support is amazing.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "/professional-man.png",
    content:
      "Finally, a platform that turns learning intentions into actionable plans. The progress tracking keeps me motivated and accountable.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "UX Designer",
    avatar: "/creative-professional.png",
    content:
      "The reward system and community features make learning feel like a game. I've completed more courses in 3 months than in the past year.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by learners worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Join thousands of successful learners who have transformed their goals into achievements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
