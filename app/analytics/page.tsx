"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/dashboard-sidebar"
import { HexagonRadarChart } from "@/components/hexagon-radar-chart"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Target, Clock, BookOpen, Brain, Code, Lightbulb } from "lucide-react"

const learningAttributes = [
  { attribute: "Coding", value: 85, maxValue: 100 },
  { attribute: "Theory", value: 70, maxValue: 100 },
  { attribute: "Practice", value: 90, maxValue: 100 },
  { attribute: "Sharing", value: 60, maxValue: 100 },
  { attribute: "Problem Solving", value: 80, maxValue: 100 },
  { attribute: "Collaboration", value: 65, maxValue: 100 },
]

const weeklyProgress = [
  { week: "Week 1", hours: 12, completed: 3 },
  { week: "Week 2", hours: 15, completed: 5 },
  { week: "Week 3", hours: 18, completed: 4 },
  { week: "Week 4", hours: 22, completed: 7 },
  { week: "Week 5", hours: 20, completed: 6 },
  { week: "Week 6", hours: 25, completed: 8 },
]

const skillProgress = [
  { skill: "JavaScript", progress: 85 },
  { skill: "React", progress: 78 },
  { skill: "Node.js", progress: 65 },
  { skill: "Python", progress: 45 },
  { skill: "SQL", progress: 70 },
  { skill: "UI/UX", progress: 60 },
]

export default function AnalyticsPage() {
  const totalHours = weeklyProgress.reduce((sum, week) => sum + week.hours, 0)
  const totalCompleted = weeklyProgress.reduce((sum, week) => sum + week.completed, 0)
  const averageScore = Math.round(
    learningAttributes.reduce((sum, attr) => sum + attr.value, 0) / learningAttributes.length,
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Analytics</h1>
            <p className="text-muted-foreground">Visualize your learning progress and skill development</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                    <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                    <p className="text-2xl font-bold text-foreground">4</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hexagon Radar Chart */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Learning Attributes
                </CardTitle>
                <CardDescription>Your skill distribution across different learning dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <HexagonRadarChart data={learningAttributes} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {learningAttributes.map((attr, index) => (
                    <div key={attr.attribute} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${160 + index * 30}, 65%, 50%)` }}
                      />
                      <span className="text-sm text-muted-foreground">{attr.attribute}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {attr.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>Your learning hours and completed tasks over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-2))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Skill Progress
                </CardTitle>
                <CardDescription>Your proficiency levels across different technologies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
                <CardDescription>Personalized recommendations based on your learning patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-foreground mb-2">Strength: Practical Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    You excel at hands-on practice with a 90% score. Consider mentoring others to boost your sharing
                    skills.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-medium text-foreground mb-2">Opportunity: Theory Foundation</h4>
                  <p className="text-sm text-muted-foreground">
                    Your theory score (70%) could be improved. Try adding more conceptual learning to your plans.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-foreground mb-2">Recommendation: Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Join study groups or pair programming sessions to enhance your collaboration skills (65%).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
