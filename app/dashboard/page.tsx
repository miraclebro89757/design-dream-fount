"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, BookOpen, Clock, Target, TrendingUp } from "lucide-react"
import { Sidebar } from "@/components/dashboard-sidebar"

interface LearningPlan {
  id: string
  title: string
  description: string
  progress: number
  totalTasks: number
  completedTasks: number
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedHours: number
  createdAt: string
  lastUpdated: string
}

const mockPlans: LearningPlan[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases",
    progress: 65,
    totalTasks: 24,
    completedTasks: 16,
    category: "Programming",
    difficulty: "Intermediate",
    estimatedHours: 120,
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Learn Python, statistics, and machine learning basics",
    progress: 30,
    totalTasks: 18,
    completedTasks: 5,
    category: "Data Science",
    difficulty: "Beginner",
    estimatedHours: 80,
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
  },
  {
    id: "3",
    title: "UI/UX Design Mastery",
    description: "Complete guide to user interface and experience design",
    progress: 85,
    totalTasks: 15,
    completedTasks: 13,
    category: "Design",
    difficulty: "Advanced",
    estimatedHours: 60,
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-19",
  },
  {
    id: "4",
    title: "DevOps and Cloud Computing",
    description: "Learn Docker, Kubernetes, AWS, and CI/CD pipelines",
    progress: 45,
    totalTasks: 20,
    completedTasks: 9,
    category: "DevOps",
    difficulty: "Advanced",
    estimatedHours: 100,
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-17",
  },
]

export default function DashboardPage() {
  const [plans, setPlans] = useState<LearningPlan[]>(mockPlans)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner" as const,
    estimatedHours: 0,
  })

  const categories = ["All", "Programming", "Data Science", "Design", "DevOps", "Business", "Marketing"]

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || plan.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreatePlan = () => {
    const plan: LearningPlan = {
      id: Date.now().toString(),
      ...newPlan,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setPlans([...plans, plan])
    setNewPlan({
      title: "",
      description: "",
      category: "",
      difficulty: "Beginner",
      estimatedHours: 0,
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Learning Plans</h1>
              <p className="text-muted-foreground">Manage and track your learning journey</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Learning Plan</DialogTitle>
                  <DialogDescription>Start a new learning journey by creating a personalized plan.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter plan title"
                      value={newPlan.title}
                      onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your learning goals"
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="e.g., Programming"
                        value={newPlan.category}
                        onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hours">Estimated Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        placeholder="0"
                        value={newPlan.estimatedHours || ""}
                        onChange={(e) =>
                          setNewPlan({ ...newPlan, estimatedHours: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePlan} disabled={!newPlan.title || !newPlan.description}>
                      Create Plan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Plans</p>
                    <p className="text-2xl font-bold text-foreground">{plans.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {plans.filter((p) => p.progress === 100).length}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-foreground">
                      {plans.filter((p) => p.progress > 0 && p.progress < 100).length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold text-foreground">
                      {plans.reduce((sum, plan) => sum + plan.estimatedHours, 0)}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search learning plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Learning Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg leading-tight">{plan.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {plan.category}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(plan.difficulty)}`}>{plan.difficulty}</Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{plan.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {plan.completedTasks}/{plan.totalTasks} tasks
                    </span>
                    <span>{plan.estimatedHours}h estimated</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Created {plan.createdAt}</span>
                    <span>Updated {plan.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No learning plans found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "Create your first learning plan to get started."}
              </p>
              {!searchTerm && selectedCategory === "All" && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Plan
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
