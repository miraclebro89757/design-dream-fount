"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  MessageCircle,
  Clock,
  Users,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Trophy,
  Heart,
  Brain,
  TrendingUp,
  Zap,
  Target,
  Star,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard-sidebar"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  timestamp: string
  category: string
  likes: number
  comments: Comment[]
  tags: string[]
}

interface AIAnalysis {
  id: string
  type: "comparison" | "recommendation" | "insight"
  title: string
  description: string
  confidence: number
  relevantPosts: string[]
}

interface LearningPlan {
  id: string
  title: string
  description: string
  progress: number
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  author: string
  likes: number
  completions: number
  tags: string[]
}

const samplePosts: Post[] = [
  {
    id: "1",
    title: "Just completed my React learning plan! 🎉",
    content:
      "After 3 months of consistent learning, I finally finished my React development plan. The mind-map approach really helped me stay organized. Now I'm building my first full-stack project!",
    author: "Sarah Chen",
    avatar: "/woman-developer.jpg",
    timestamp: "2 hours ago",
    category: "Success Story",
    likes: 24,
    tags: ["React", "Success", "Frontend"],
    comments: [
      {
        id: "c1",
        author: "Mike Johnson",
        avatar: "/man-developer.jpg",
        content: "Congratulations! What was the most challenging part?",
        timestamp: "1 hour ago",
        likes: 3,
      },
      {
        id: "c2",
        author: "Emma Wilson",
        avatar: "/woman-designer.jpg",
        content: "Amazing progress! I'm starting my React journey next week.",
        timestamp: "45 minutes ago",
        likes: 2,
      },
    ],
  },
  {
    id: "2",
    title: "Need advice on learning data science with a full-time job",
    content:
      "I'm working 40+ hours a week and trying to transition into data science. How do you manage time effectively? Any tips for staying consistent with learning?",
    author: "Alex Rodriguez",
    avatar: "/man-student.jpg",
    timestamp: "5 hours ago",
    category: "Question",
    likes: 18,
    tags: ["Data Science", "Time Management", "Career Change"],
    comments: [
      {
        id: "c3",
        author: "Dr. Lisa Park",
        avatar: "/woman-professor.jpg",
        content: "I recommend the Pomodoro technique - 25 minutes of focused learning daily can add up!",
        timestamp: "3 hours ago",
        likes: 8,
      },
      {
        id: "c4",
        author: "James Wilson",
        avatar: "/man-analyst.jpg",
        content: "Early mornings worked for me. 1 hour before work, consistently for 6 months.",
        timestamp: "2 hours ago",
        likes: 5,
      },
    ],
  },
  {
    id: "3",
    title: "Created a UI/UX learning template - feedback welcome!",
    content:
      "I've been working on a comprehensive UI/UX design learning plan template. It covers everything from design principles to prototyping. Would love to get feedback from the community before sharing it in the templates section.",
    author: "Emma Thompson",
    avatar: "/woman-designer.jpg",
    timestamp: "1 day ago",
    category: "Resource Sharing",
    likes: 31,
    tags: ["UI/UX", "Template", "Design"],
    comments: [
      {
        id: "c5",
        author: "David Kim",
        avatar: "/man-designer.jpg",
        content: "This sounds great! Does it include user research methods?",
        timestamp: "18 hours ago",
        likes: 4,
      },
    ],
  },
  {
    id: "4",
    title: "Struggling with motivation - how do you stay consistent?",
    content:
      "I started strong with my learning plan but I'm losing momentum after 3 weeks. The initial excitement is wearing off. How do you maintain long-term motivation?",
    author: "Jordan Martinez",
    avatar: "/person-student.jpg",
    timestamp: "2 days ago",
    category: "Discussion",
    likes: 42,
    tags: ["Motivation", "Consistency", "Learning Tips"],
    comments: [
      {
        id: "c6",
        author: "Coach Alex",
        avatar: "/man-coach.jpg",
        content: "Set smaller, achievable milestones. Celebrate small wins!",
        timestamp: "1 day ago",
        likes: 12,
      },
      {
        id: "c7",
        author: "Maria Garcia",
        avatar: "/woman-mentor.jpg",
        content: "Find an accountability partner. It makes a huge difference!",
        timestamp: "1 day ago",
        likes: 8,
      },
    ],
  },
]

const communityPlans: LearningPlan[] = [
  {
    id: "cp1",
    title: "Full Stack JavaScript Mastery",
    description: "Complete guide from frontend to backend with React, Node.js, and MongoDB",
    progress: 100,
    category: "Programming",
    difficulty: "Intermediate",
    author: "Sarah Chen",
    likes: 156,
    completions: 89,
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: "cp2",
    title: "Data Science with Python",
    description: "Learn Python, pandas, scikit-learn, and machine learning fundamentals",
    progress: 85,
    category: "Data Science",
    difficulty: "Beginner",
    author: "Dr. Lisa Park",
    likes: 203,
    completions: 124,
    tags: ["Python", "Data Science", "Machine Learning", "pandas"],
  },
  {
    id: "cp3",
    title: "UI/UX Design Fundamentals",
    description: "Master design principles, user research, and prototyping tools",
    progress: 95,
    category: "Design",
    difficulty: "Beginner",
    author: "Emma Thompson",
    likes: 178,
    completions: 67,
    tags: ["UI/UX", "Design", "Figma", "User Research"],
  },
]

const aiAnalyses: AIAnalysis[] = [
  {
    id: "ai1",
    type: "comparison",
    title: "Similar Learning Path Detected",
    description:
      "Your React learning plan is 78% similar to Sarah Chen's Full Stack JavaScript Mastery. Consider adding Node.js modules to expand your backend skills.",
    confidence: 85,
    relevantPosts: ["cp1"],
  },
  {
    id: "ai2",
    type: "recommendation",
    title: "Skill Gap Analysis",
    description:
      "Based on your current progress, adding UI/UX fundamentals could complement your development skills and increase your market value by 34%.",
    confidence: 92,
    relevantPosts: ["cp3"],
  },
  {
    id: "ai3",
    type: "insight",
    title: "Learning Pattern Insight",
    description:
      "Users with similar learning patterns to yours have 67% higher completion rates when they engage with community discussions weekly.",
    confidence: 78,
    relevantPosts: [],
  },
]

const categories = ["All", "Question", "Success Story", "Resource Sharing", "Discussion", "Tips & Tricks"]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Question":
      return HelpCircle
    case "Success Story":
      return Trophy
    case "Resource Sharing":
      return BookOpen
    case "Discussion":
      return MessageSquare
    case "Tips & Tricks":
      return Lightbulb
    default:
      return MessageCircle
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Question":
      return "bg-blue-100 text-blue-800"
    case "Success Story":
      return "bg-green-100 text-green-800"
    case "Resource Sharing":
      return "bg-purple-100 text-purple-800"
    case "Discussion":
      return "bg-orange-100 text-orange-800"
    case "Tips & Tricks":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
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

const getAnalysisIcon = (type: string) => {
  switch (type) {
    case "comparison":
      return TrendingUp
    case "recommendation":
      return Target
    case "insight":
      return Lightbulb
    default:
      return Brain
  }
}

const getAnalysisColor = (type: string) => {
  switch (type) {
    case "comparison":
      return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    case "recommendation":
      return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    case "insight":
      return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    default:
      return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
  }
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<"discussions" | "plans" | "insights">("discussions")
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Discussion",
    tags: "",
  })

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const post: Post = {
      id: `post-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: "You", // In a real app, this would be the current user
      avatar: "/user-avatar.jpg",
      timestamp: "Just now",
      category: newPost.category,
      likes: 0,
      comments: [],
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "", category: "Discussion", tags: "" })
    setShowNewPostDialog(false)
  }

  const likePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: "You",
      avatar: "/user-avatar.jpg",
      content,
      timestamp: "Just now",
      likes: 0,
    }

    setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post)))
  }

  const comparePlan = (plan: LearningPlan) => {
    setSelectedPlan(plan)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Community</h1>
            <p className="text-muted-foreground">Connect with fellow learners and discover new learning paths</p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Learners</p>
                    <p className="text-2xl font-bold text-foreground">2,847</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Discussions</p>
                    <p className="text-2xl font-bold text-foreground">1,293</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Shared Plans</p>
                    <p className="text-2xl font-bold text-foreground">456</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AI Insights</p>
                    <p className="text-2xl font-bold text-foreground">8,421</p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "discussions" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("discussions")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Discussions
            </Button>
            <Button
              variant={activeTab === "plans" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("plans")}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Community Plans
            </Button>
            <Button
              variant={activeTab === "insights" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("insights")}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              AI Insights
            </Button>
          </div>

          {/* AI Insights Tab */}
          {activeTab === "insights" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Personalized AI Insights</h2>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Updated 2 hours ago
                </Badge>
              </div>

              <div className="grid gap-4">
                {aiAnalyses.map((analysis) => {
                  const IconComponent = getAnalysisIcon(analysis.type)
                  return (
                    <Card key={analysis.id} className={`${getAnalysisColor(analysis.type)} border`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{analysis.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {analysis.type}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                  <span className="text-xs text-muted-foreground">
                                    {analysis.confidence}% confidence
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{analysis.description}</p>
                        {analysis.relevantPosts.length > 0 && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Related Plans
                            </Button>
                            <Button size="sm" variant="ghost">
                              Learn More
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Community Plans Tab */}
          {activeTab === "plans" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Community Learning Plans</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search plans..." className="pl-10 w-64" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg leading-tight">{plan.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {plan.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(plan.difficulty)}`}>
                              {plan.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm leading-relaxed">{plan.description}</CardDescription>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span className="font-medium">{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{plan.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{plan.completions} completed</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {plan.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          Copy Plan
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => comparePlan(plan)}>
                          <Brain className="w-4 h-4 mr-1" />
                          Compare
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">{plan.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>by {plan.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                      <DialogDescription>
                        Share your thoughts, ask questions, or help others in the community
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          placeholder="What's your post about?"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                          className="w-full p-2 border rounded"
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Content</label>
                        <Textarea
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          placeholder="Share your thoughts..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                        <Input
                          value={newPost.tags}
                          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                          placeholder="React, JavaScript, Learning Tips..."
                        />
                      </div>
                      <Button
                        onClick={createPost}
                        className="w-full"
                        disabled={!newPost.title.trim() || !newPost.content.trim()}
                      >
                        Create Post
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Category Filter */}
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

              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => {
                  const IconComponent = getCategoryIcon(post.category)
                  return (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{post.author}</span>
                              <Badge className={getCategoryColor(post.category)}>
                                <IconComponent className="h-3 w-3 mr-1" />
                                {post.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.timestamp}
                              </span>
                            </div>
                            <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                            <CardDescription className="text-sm leading-relaxed">{post.content}</CardDescription>
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => likePost(post.id)}
                            className="flex items-center gap-1"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </Button>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments.length} comments
                          </span>
                        </div>

                        {/* Comments */}
                        {post.comments.length > 0 && (
                          <div className="space-y-3 border-t pt-4">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                  <AvatarFallback className="text-xs">{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-muted/50 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                  <Button variant="ghost" size="sm" className="mt-1 h-6 px-2 text-xs">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {comment.likes}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment */}
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">Y</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Add a comment..."
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  addComment(post.id, (e.target as HTMLInputElement).value)
                                  ;(e.target as HTMLInputElement).value = ""
                                }
                              }}
                            />
                            <Button size="sm" variant="outline">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredPosts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Plan Comparison Dialog */}
          {selectedPlan && (
            <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>AI Plan Comparison</DialogTitle>
                  <DialogDescription>
                    Comparing "{selectedPlan.title}" with your current learning plans
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Analysis Results
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Skill Overlap</span>
                        <div className="flex items-center gap-2">
                          <Progress value={78} className="w-20 h-2" />
                          <span className="font-medium">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Difficulty Match</span>
                        <div className="flex items-center gap-2">
                          <Progress value={92} className="w-20 h-2" />
                          <span className="font-medium">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Learning Style Fit</span>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="w-20 h-2" />
                          <span className="font-medium">85%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2 text-green-700">New Skills You'll Learn</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <Plus className="w-3 h-3 text-green-600" />
                          Advanced React Patterns
                        </li>
                        <li className="flex items-center gap-2">
                          <Plus className="w-3 h-3 text-green-600" />
                          Database Design
                        </li>
                        <li className="flex items-center gap-2">
                          <Plus className="w-3 h-3 text-green-600" />
                          API Security
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-blue-700">Skills You Already Have</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-blue-600 fill-current" />
                          JavaScript Fundamentals
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-blue-600 fill-current" />
                          React Basics
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-blue-600 fill-current" />
                          Git & Version Control
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Copy This Plan</Button>
                    <Button variant="outline">View Full Details</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
    </div>
  )
}
