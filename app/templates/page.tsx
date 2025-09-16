"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookTemplate,
  Search,
  Clock,
  Target,
  Copy,
  Star,
  Code,
  Palette,
  TrendingUp,
  Briefcase,
  Camera,
  Dumbbell,
} from "lucide-react"

interface TemplateNode {
  id: string
  title: string
  description: string
  children: TemplateNode[]
  level: number
  completed: boolean
  outputs: any[]
}

interface Template {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  rating: number
  downloads: number
  tags: string[]
  rootNode: TemplateNode
  author: string
}

const sampleTemplates: Template[] = [
  {
    id: "react-dev",
    title: "React Development Mastery",
    description: "Complete guide to becoming a React developer from basics to advanced concepts",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "3 months",
    rating: 4.8,
    downloads: 1250,
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    author: "Sarah Chen",
    rootNode: {
      id: "root",
      title: "React Development Mastery",
      description: "Master React development from fundamentals to advanced patterns",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "fundamentals",
          title: "React Fundamentals",
          description: "Core React concepts and basics",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "jsx",
              title: "JSX and Components",
              description: "Understanding JSX syntax and component creation",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "props-state",
              title: "Props and State",
              description: "Managing component data and interactions",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
        {
          id: "hooks",
          title: "React Hooks",
          description: "Modern React with hooks",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "basic-hooks",
              title: "Basic Hooks (useState, useEffect)",
              description: "Essential hooks for state and side effects",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "custom-hooks",
              title: "Custom Hooks",
              description: "Creating reusable logic with custom hooks",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
        {
          id: "advanced",
          title: "Advanced React",
          description: "Advanced patterns and optimization",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "context",
              title: "Context API",
              description: "Global state management with Context",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "performance",
              title: "Performance Optimization",
              description: "React.memo, useMemo, useCallback",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    description: "Learn data science from scratch with Python, statistics, and machine learning",
    category: "Data Science",
    difficulty: "Beginner",
    duration: "4 months",
    rating: 4.6,
    downloads: 890,
    tags: ["Python", "Statistics", "Machine Learning", "Data Analysis"],
    author: "Dr. Michael Rodriguez",
    rootNode: {
      id: "root",
      title: "Data Science Fundamentals",
      description: "Complete data science learning path",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "python",
          title: "Python for Data Science",
          description: "Python programming essentials",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "statistics",
          title: "Statistics and Probability",
          description: "Statistical foundations for data science",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "ml",
          title: "Machine Learning Basics",
          description: "Introduction to ML algorithms",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
      ],
    },
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Complete Course",
    description: "Master user interface and user experience design principles and tools",
    category: "Design",
    difficulty: "Intermediate",
    duration: "2 months",
    rating: 4.9,
    downloads: 2100,
    tags: ["UI Design", "UX Design", "Figma", "Design Systems"],
    author: "Emma Thompson",
    rootNode: {
      id: "root",
      title: "UI/UX Design Complete Course",
      description: "Comprehensive UI/UX design learning path",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "design-principles",
          title: "Design Principles",
          description: "Fundamental design principles and theory",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "user-research",
          title: "User Research",
          description: "Understanding users and their needs",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "prototyping",
          title: "Prototyping and Testing",
          description: "Creating and testing design prototypes",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
      ],
    },
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital marketing from SEO to social media advertising",
    category: "Marketing",
    difficulty: "Beginner",
    duration: "6 weeks",
    rating: 4.4,
    downloads: 1580,
    tags: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    author: "James Wilson",
    rootNode: {
      id: "root",
      title: "Digital Marketing Strategy",
      description: "Complete digital marketing learning journey",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "seo",
          title: "Search Engine Optimization",
          description: "Organic search visibility strategies",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "social-media",
          title: "Social Media Marketing",
          description: "Building brand presence on social platforms",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "analytics",
          title: "Marketing Analytics",
          description: "Measuring and optimizing marketing performance",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
      ],
    },
  },
  {
    id: "photography",
    title: "Photography Fundamentals",
    description: "Learn photography basics from composition to post-processing",
    category: "Creative",
    difficulty: "Beginner",
    duration: "8 weeks",
    rating: 4.7,
    downloads: 750,
    tags: ["Photography", "Composition", "Lighting", "Editing"],
    author: "Lisa Park",
    rootNode: {
      id: "root",
      title: "Photography Fundamentals",
      description: "Master the art of photography",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "camera-basics",
          title: "Camera Basics",
          description: "Understanding camera settings and controls",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "composition",
          title: "Composition Techniques",
          description: "Creating visually appealing photographs",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "editing",
          title: "Photo Editing",
          description: "Post-processing and enhancement techniques",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
      ],
    },
  },
  {
    id: "fitness-journey",
    title: "Complete Fitness Journey",
    description: "Comprehensive fitness plan covering strength, cardio, and nutrition",
    category: "Health & Fitness",
    difficulty: "Beginner",
    duration: "12 weeks",
    rating: 4.5,
    downloads: 980,
    tags: ["Fitness", "Strength Training", "Cardio", "Nutrition"],
    author: "Coach Alex Martinez",
    rootNode: {
      id: "root",
      title: "Complete Fitness Journey",
      description: "Transform your health and fitness",
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "strength",
          title: "Strength Training",
          description: "Building muscle and strength",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "cardio",
          title: "Cardiovascular Fitness",
          description: "Improving heart health and endurance",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
        {
          id: "nutrition",
          title: "Nutrition Planning",
          description: "Healthy eating for fitness goals",
          level: 1,
          completed: false,
          outputs: [],
          children: [],
        },
      ],
    },
  },
]

const categories = ["All", "Programming", "Data Science", "Design", "Marketing", "Creative", "Health & Fitness"]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Programming":
      return Code
    case "Data Science":
      return TrendingUp
    case "Design":
      return Palette
    case "Marketing":
      return Briefcase
    case "Creative":
      return Camera
    case "Health & Fitness":
      return Dumbbell
    default:
      return BookTemplate
  }
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const filteredTemplates = sampleTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const copyTemplate = (template: Template) => {
    // Create a new learning plan from the template
    const newPlan = {
      id: `plan-${Date.now()}`,
      title: `${template.title} (Copy)`,
      description: template.description,
      createdAt: new Date().toISOString(),
      rootNode: { ...template.rootNode, id: `root-${Date.now()}` },
    }

    // Save to localStorage
    const existingPlans = JSON.parse(localStorage.getItem("learningPlans") || "[]")
    existingPlans.push(newPlan)
    localStorage.setItem("learningPlans", JSON.stringify(existingPlans))

    alert("Template copied to your learning plans!")
    setSelectedTemplate(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Learning Plan Templates</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Jumpstart your learning journey with professionally crafted templates
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-2"
                  >
                    {React.createElement(getCategoryIcon(category), { className: "h-4 w-4" })}
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const IconComponent = getCategoryIcon(template.category)
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{template.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-2">{template.title}</CardTitle>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {template.duration}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">
                            {template.downloads.toLocaleString()} downloads
                          </span>
                          <Dialog
                            open={selectedTemplate?.id === template.id}
                            onOpenChange={(open) => setSelectedTemplate(open ? template : null)}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Target className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <IconComponent className="h-5 w-5 text-primary" />
                                  {template.title}
                                </DialogTitle>
                                <DialogDescription>{template.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                  <Badge className={getDifficultyColor(template.difficulty)}>
                                    {template.difficulty}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {template.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {template.rating}
                                  </span>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Learning Path:</h4>
                                  <div className="space-y-2">
                                    {template.rootNode.children.map((node, index) => (
                                      <div key={node.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                          {index + 1}
                                        </span>
                                        <div>
                                          <p className="font-medium text-sm">{node.title}</p>
                                          <p className="text-xs text-muted-foreground">{node.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Tags:</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {template.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="text-sm text-muted-foreground">
                                  <p>
                                    Created by: <span className="font-medium">{template.author}</span>
                                  </p>
                                  <p>{template.downloads.toLocaleString()} downloads</p>
                                </div>

                                <Button onClick={() => copyTemplate(template)} className="w-full">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Template to My Plans
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookTemplate className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
