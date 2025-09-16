"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Link,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react"

interface NodeOutput {
  id: string
  type: "image" | "link" | "text"
  content: string
  title: string
}

interface MindMapNode {
  id: string
  title: string
  description: string
  children: MindMapNode[]
  level: number
  completed: boolean
  outputs: NodeOutput[]
}

interface LearningPlan {
  id: string
  title: string
  description: string
  createdAt: string
  rootNode: MindMapNode
}

export default function ProgressPage() {
  const [learningPlans, setLearningPlans] = useState<LearningPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null)

  useEffect(() => {
    // Load learning plans from localStorage
    const plans = JSON.parse(localStorage.getItem("learningPlans") || "[]")
    setLearningPlans(plans)
  }, [])

  const calculateProgress = (node: MindMapNode): { completed: number; total: number } => {
    let completed = node.completed ? 1 : 0
    let total = 1

    for (const child of node.children) {
      const childProgress = calculateProgress(child)
      completed += childProgress.completed
      total += childProgress.total
    }

    return { completed, total }
  }

  const getAllNodes = (node: MindMapNode): MindMapNode[] => {
    let nodes = [node]
    for (const child of node.children) {
      nodes = nodes.concat(getAllNodes(child))
    }
    return nodes
  }

  const renderNodeWithOutputs = (node: MindMapNode) => {
    if (!node.completed || node.outputs.length === 0) return null

    return (
      <Card key={node.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">{node.title}</CardTitle>
            <Badge variant="secondary">Level {node.level + 1}</Badge>
          </div>
          <CardDescription>{node.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Outputs:</h4>
            {node.outputs.map((output) => (
              <div key={output.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {output.type === "text" && <FileText className="h-4 w-4 text-blue-600" />}
                  {output.type === "link" && <Link className="h-4 w-4 text-green-600" />}
                  {output.type === "image" && <Eye className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{output.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 break-words">
                    {output.type === "link" ? (
                      <a
                        href={output.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {output.content}
                      </a>
                    ) : output.type === "image" ? (
                      <a
                        href={output.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Image
                      </a>
                    ) : (
                      output.content
                    )}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {output.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const overallStats = learningPlans.reduce(
    (acc, plan) => {
      const progress = calculateProgress(plan.rootNode)
      acc.totalNodes += progress.total
      acc.completedNodes += progress.completed
      acc.totalPlans += 1
      if (progress.completed === progress.total && progress.total > 0) {
        acc.completedPlans += 1
      }
      return acc
    },
    { totalNodes: 0, completedNodes: 0, totalPlans: 0, completedPlans: 0 },
  )

  const overallProgress =
    overallStats.totalNodes > 0 ? Math.round((overallStats.completedNodes / overallStats.totalNodes) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Progress</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Monitor your learning journey and celebrate your achievements
              </p>
            </div>

            {learningPlans.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Learning Plans Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first learning plan to start tracking your progress
                  </p>
                  <Button asChild>
                    <a href="/create">Create Your First Plan</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Overall Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-2xl font-bold">{overallProgress}%</p>
                          <Progress value={overallProgress} className="w-full mt-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Learning Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {overallStats.completedPlans}/{overallStats.totalPlans}
                          </p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {overallStats.completedNodes}/{overallStats.totalNodes}
                          </p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Since</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold">
                            {learningPlans.length > 0
                              ? new Date(
                                  Math.min(...learningPlans.map((p) => new Date(p.createdAt).getTime())),
                                ).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                              : "N/A"}
                          </p>
                          <p className="text-sm text-muted-foreground">Started</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Learning Plans List */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {learningPlans.map((plan) => {
                    const progress = calculateProgress(plan.rootNode)
                    const progressPercentage =
                      progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0
                    const allNodes = getAllNodes(plan.rootNode)
                    const completedNodesWithOutputs = allNodes.filter(
                      (node) => node.completed && node.outputs.length > 0,
                    )

                    return (
                      <Card
                        key={plan.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20"
                        onClick={() => setSelectedPlan(selectedPlan?.id === plan.id ? null : plan)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2 text-balance leading-tight">{plan.title}</CardTitle>
                              <CardDescription className="text-balance">{plan.description}</CardDescription>
                            </div>
                            <Badge
                              variant={progressPercentage === 100 ? "default" : "secondary"}
                              className="ml-3 flex-shrink-0"
                            >
                              {progressPercentage}%
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Progress</span>
                                <span className="text-muted-foreground">{progressPercentage}%</span>
                              </div>
                              <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-muted-foreground">
                                  {progress.completed}/{progress.total} tasks
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-muted-foreground">
                                  {new Date(plan.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {completedNodesWithOutputs.length > 0 && (
                              <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                <span className="font-medium">{completedNodesWithOutputs.length}</span>
                                <span className="text-muted-foreground">tasks with outputs</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Selected Plan Details */}
                {selectedPlan && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Completed Tasks with Outputs</h2>
                      <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                        Close Details
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {getAllNodes(selectedPlan.rootNode)
                        .filter((node) => node.completed && node.outputs.length > 0)
                        .map(renderNodeWithOutputs)}

                      {getAllNodes(selectedPlan.rootNode).filter((node) => node.completed && node.outputs.length > 0)
                        .length === 0 && (
                        <Card>
                          <CardContent className="text-center py-8">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No completed tasks with outputs yet</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
