"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Brain, Sparkles, Plus, Edit3, Trash2, Save, CheckCircle, Upload, Link, FileText, Eye } from "lucide-react"

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

export function MindMapCreator() {
  const [topic, setTopic] = useState("")
  const [goals, setGoals] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [mindMap, setMindMap] = useState<MindMapNode | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingNode, setEditingNode] = useState<string | null>(null)
  const [planTitle, setPlanTitle] = useState("")
  const [planDescription, setPlanDescription] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showOutputDialog, setShowOutputDialog] = useState<string | null>(null)
  const [newOutput, setNewOutput] = useState({ type: "text" as const, title: "", content: "" })

  const generateMindMap = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    // Simulate AI generation with a realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a sample mind map based on the topic
    const sampleMindMap: MindMapNode = {
      id: "root",
      title: topic,
      description: `Master ${topic} through structured learning`,
      level: 0,
      completed: false,
      outputs: [],
      children: [
        {
          id: "fundamentals",
          title: "Fundamentals",
          description: "Core concepts and basics",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "theory",
              title: "Theory & Concepts",
              description: "Understanding the underlying principles",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "terminology",
              title: "Key Terminology",
              description: "Essential vocabulary and definitions",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
        {
          id: "practical",
          title: "Practical Application",
          description: "Hands-on experience and projects",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "projects",
              title: "Practice Projects",
              description: "Build real-world applications",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "exercises",
              title: "Exercises",
              description: "Skill-building activities",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
        {
          id: "advanced",
          title: "Advanced Topics",
          description: "Deep dive into complex areas",
          level: 1,
          completed: false,
          outputs: [],
          children: [
            {
              id: "specialization",
              title: "Specialization Areas",
              description: "Choose your focus area",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
            {
              id: "industry",
              title: "Industry Applications",
              description: "Real-world use cases",
              level: 2,
              completed: false,
              outputs: [],
              children: [],
            },
          ],
        },
      ],
    }

    setMindMap(sampleMindMap)
    setPlanTitle(topic)
    setPlanDescription(goals || `Learning plan for ${topic}`)
    setIsGenerating(false)
  }

  const toggleNodeCompletion = (nodeId: string) => {
    if (!mindMap) return

    const updateNodeRecursive = (node: MindMapNode): MindMapNode => {
      if (node.id === nodeId) {
        return { ...node, completed: !node.completed }
      }
      return {
        ...node,
        children: node.children.map(updateNodeRecursive),
      }
    }

    setMindMap(updateNodeRecursive(mindMap))
  }

  const addOutput = (nodeId: string) => {
    if (!mindMap || !newOutput.title.trim() || !newOutput.content.trim()) return

    const output: NodeOutput = {
      id: `output-${Date.now()}`,
      type: newOutput.type,
      title: newOutput.title,
      content: newOutput.content,
    }

    const updateNodeRecursive = (node: MindMapNode): MindMapNode => {
      if (node.id === nodeId) {
        return { ...node, outputs: [...node.outputs, output] }
      }
      return {
        ...node,
        children: node.children.map(updateNodeRecursive),
      }
    }

    setMindMap(updateNodeRecursive(mindMap))
    setNewOutput({ type: "text", title: "", content: "" })
    setShowOutputDialog(null)
  }

  const updateNode = (nodeId: string, newTitle: string, newDescription: string) => {
    if (!mindMap) return

    const updateNodeRecursive = (node: MindMapNode): MindMapNode => {
      if (node.id === nodeId) {
        return { ...node, title: newTitle, description: newDescription }
      }
      return {
        ...node,
        children: node.children.map(updateNodeRecursive),
      }
    }

    setMindMap(updateNodeRecursive(mindMap))
    setEditingNode(null)
  }

  const addChildNode = (parentId: string) => {
    if (!mindMap) return

    const addNodeRecursive = (node: MindMapNode): MindMapNode => {
      if (node.id === parentId) {
        const newNode: MindMapNode = {
          id: `node-${Date.now()}`,
          title: "New Topic",
          description: "Add description here",
          level: node.level + 1,
          completed: false,
          outputs: [],
          children: [],
        }
        return { ...node, children: [...node.children, newNode] }
      }
      return {
        ...node,
        children: node.children.map(addNodeRecursive),
      }
    }

    setMindMap(addNodeRecursive(mindMap))
  }

  const deleteNode = (nodeId: string) => {
    if (!mindMap || nodeId === "root") return

    const deleteNodeRecursive = (node: MindMapNode): MindMapNode => {
      return {
        ...node,
        children: node.children.filter((child) => child.id !== nodeId).map(deleteNodeRecursive),
      }
    }

    setMindMap(deleteNodeRecursive(mindMap))
  }

  const savePlan = () => {
    if (!mindMap || !planTitle.trim()) return

    const plan: LearningPlan = {
      id: `plan-${Date.now()}`,
      title: planTitle,
      description: planDescription,
      createdAt: new Date().toISOString(),
      rootNode: mindMap,
    }

    // Save to localStorage for now (in a real app, this would be saved to a database)
    const existingPlans = JSON.parse(localStorage.getItem("learningPlans") || "[]")
    existingPlans.push(plan)
    localStorage.setItem("learningPlans", JSON.stringify(existingPlans))

    setShowSaveDialog(false)
    alert("Learning plan saved successfully!")
  }

  const renderMindMapNode = (node: MindMapNode) => {
    const isEditing = editingNode === node.id
    const completionPercentage =
      node.children.length > 0
        ? Math.round((node.children.filter((child) => child.completed).length / node.children.length) * 100)
        : 0

    return (
      <div key={node.id} className="relative">
        <Card
          className={`mb-4 transition-all duration-300 hover:shadow-md ${
            node.completed
              ? "border-green-300 bg-gradient-to-r from-green-50 to-green-100/50 shadow-sm"
              : node.level === 0
                ? "border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-md"
                : node.level === 1
                  ? "border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50"
                  : "border-gray-200 bg-gradient-to-r from-white to-gray-50/50 hover:border-gray-300"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  <Checkbox
                    checked={node.completed}
                    onCheckedChange={() => toggleNodeCompletion(node.id)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                </div>
                {isEditing ? (
                  <Input
                    defaultValue={node.title}
                    className="font-semibold"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const title = (e.target as HTMLInputElement).value
                        const description = node.description
                        updateNode(node.id, title, description)
                      }
                    }}
                  />
                ) : (
                  <CardTitle
                    className={`${
                      node.level === 0 ? "text-xl" : node.level === 1 ? "text-lg" : "text-base"
                    } ${node.completed ? "line-through text-muted-foreground" : ""} text-balance leading-tight`}
                  >
                    {node.title}
                  </CardTitle>
                )}
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {node.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                <Badge variant="outline" className="text-xs">
                  L{node.level + 1}
                </Badge>
                {node.children.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {completionPercentage}%
                  </Badge>
                )}
                <div className="flex items-center gap-0.5 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingNode(isEditing ? null : node.id)}>
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  {node.id !== "root" && (
                    <Button variant="ghost" size="sm" onClick={() => deleteNode(node.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => addChildNode(node.id)}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                  <Dialog
                    open={showOutputDialog === node.id}
                    onOpenChange={(open) => setShowOutputDialog(open ? node.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Upload className="h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Output for: {node.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Output Type</label>
                          <select
                            value={newOutput.type}
                            onChange={(e) => setNewOutput({ ...newOutput, type: e.target.value as any })}
                            className="w-full p-2 border rounded"
                          >
                            <option value="text">Text/Notes</option>
                            <option value="link">Link</option>
                            <option value="image">Image URL</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input
                            value={newOutput.title}
                            onChange={(e) => setNewOutput({ ...newOutput, title: e.target.value })}
                            placeholder="Output title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Content</label>
                          <Textarea
                            value={newOutput.content}
                            onChange={(e) => setNewOutput({ ...newOutput, content: e.target.value })}
                            placeholder={
                              newOutput.type === "text"
                                ? "Your notes..."
                                : newOutput.type === "link"
                                  ? "https://..."
                                  : "Image URL..."
                            }
                            rows={4}
                          />
                        </div>
                        <Button onClick={() => addOutput(node.id)} className="w-full">
                          Add Output
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                defaultValue={node.description}
                className="mb-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    const description = (e.target as HTMLTextAreaElement).value
                    updateNode(node.id, node.title, description)
                  }
                }}
              />
            ) : (
              <p className="text-muted-foreground text-sm mb-2 text-balance">{node.description}</p>
            )}

            {node.outputs.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-foreground">Outputs:</h4>
                <div className="space-y-2">
                  {node.outputs.map((output) => (
                    <div
                      key={output.id}
                      className="flex items-center gap-3 p-3 bg-white/80 border rounded-lg shadow-sm"
                    >
                      <div className="flex-shrink-0">
                        {output.type === "text" && <FileText className="h-4 w-4 text-blue-600" />}
                        {output.type === "link" && <Link className="h-4 w-4 text-green-600" />}
                        {output.type === "image" && <Eye className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">{output.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {output.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {node.children.length > 0 && (
          <div
            className={`ml-6 pl-4 border-l-2 ${
              node.level === 0 ? "border-primary/40" : node.level === 1 ? "border-emerald-300" : "border-gray-300"
            }`}
          >
            {node.children.map(renderMindMapNode)}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm text-foreground mb-4">
              <Brain className="mr-2 h-4 w-4" />
              AI Mind-Map Generator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Learning Plan</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Let AI generate a personalized mind-map for your learning journey, then customize it to fit your needs
            </p>
          </div>

          {!mindMap ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Tell us what you want to learn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Topic *</label>
                  <Input
                    placeholder="e.g., React Development, Data Science, Digital Marketing..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Your Goals (Optional)</label>
                  <Textarea
                    placeholder="What do you want to achieve? Any specific areas of focus?"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Timeframe (Optional)</label>
                  <Input
                    placeholder="e.g., 3 months, 6 weeks, 1 year..."
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                  />
                </div>

                <Button onClick={generateMindMap} disabled={!topic.trim() || isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating Your Mind-Map...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Generate Learning Mind-Map
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Your Learning Mind-Map</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setMindMap(null)}>
                    Start Over
                  </Button>
                  <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Learning Plan</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Plan Title</label>
                          <Input
                            value={planTitle}
                            onChange={(e) => setPlanTitle(e.target.value)}
                            placeholder="Enter plan title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea
                            value={planDescription}
                            onChange={(e) => setPlanDescription(e.target.value)}
                            placeholder="Brief description of your learning plan"
                            rows={3}
                          />
                        </div>
                        <Button onClick={savePlan} className="w-full" disabled={!planTitle.trim()}>
                          Save Learning Plan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border-2 border-gray-100 p-6 shadow-sm">
                {renderMindMapNode(mindMap)}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>💡 Tips:</strong> Check off completed tasks, click the upload icon to add outputs (notes,
                  links, images), use the edit icon to modify nodes, plus icon to add subtopics, and trash icon to
                  remove items.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
