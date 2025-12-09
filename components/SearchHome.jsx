"use client"

import { useState, useRef, useEffect } from "react"
import {
  Globe,
  FileText,
  Paperclip,
  ChevronDown,
  ArrowUp,
  Sparkles,
  Check,
  Bell,
  Info,
  AlertCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AgentCard from "./AgentCard"

const agents = [
  {
    id: "survey-gen",
    name: "Survey Generator",
    description: "Generate surveys backed by evidence and research trends",
    action: "Generate survey",
    icon: "survey",
    color: "emerald",
  },
  {
    id: "hypothesis-eval",
    name: "Hypothesis Evaluator",
    description: "Assess clarity, originality, and timeliness of your hypothesis",
    action: "Get Evaluation",
    icon: "hypothesis",
    color: "emerald",
  },
  {
    id: "research-tracer",
    name: "Research Tracer",
    description: "Explore research trends by tracing paper citations",
    action: "Start Exploring",
    icon: "tracer",
    color: "teal",
  },
  {
    id: "survey-sim",
    name: "Survey Simulator",
    description: "Simulate survey responses based on target demographics",
    action: "Run Simulation",
    icon: "simulator",
    color: "emerald",
  },
  {
    id: "hypothesis-gen",
    name: "Hypothesis Generator",
    description: "Generate research hypotheses from your topic",
    action: "Generate Ideas",
    icon: "lightbulb",
    color: "teal",
  },
  {
    id: "citation",
    name: "Citation Recommender",
    description: "Find relevant citations for your research paper",
    action: "Find Citations",
    icon: "citation",
    color: "emerald",
  },
]

const searchModes = [
  {
    id: "simple",
    name: "Simple Search",
    description: "Quick, accurate insights for basic tasks",
    icon: "simple",
  },
  {
    id: "advanced",
    name: "Advanced Search",
    description: "More sources and increased accuracy",
    limit: "3 remaining today",
    upgrade: true,
  },
  {
    id: "deep",
    name: "Deep Research",
    description: "Generate a comprehensive report",
    limit: "3 remaining this month",
    upgrade: true,
  },
]

const aiModels = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", description: "Most capable model" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", description: "Fast and efficient" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", description: "Balanced performance" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", description: "Highest capability" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google", description: "Multimodal capable" },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta", description: "Open source" },
]

function NotificationsDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "New feature available",
      message: "Try our new Deep Research mode for comprehensive reports",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "success",
      title: "Research complete",
      message: "Your literature review on 'Machine Learning' is ready",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "alert",
      title: "Citation update",
      message: "3 papers in your collection have new citations",
      time: "1 day ago",
      unread: false,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-popover shadow-lg overflow-hidden z-50"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <button className="text-xs text-primary hover:underline">Mark all as read</button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer ${
                  notification.unread ? "bg-primary/5" : ""
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {notification.type === "info" && (
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Info className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                  {notification.type === "success" && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  {notification.type === "alert" && (
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{notification.title}</p>
                    {notification.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-4 py-2">
            <button className="w-full text-center text-sm text-primary hover:underline py-1">
              View all notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function SearchHome({
  searchMode,
  setSearchMode,
  searchQuery,
  setSearchQuery,
  onSearch,
  isSearching,
  selectedModel,
  setSelectedModel,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [searchType, setSearchType] = useState("advanced")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const modelDropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAdvanced(false)
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
        setShowModelSelector(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSearch(searchQuery)
    }
  }

  const currentSearchType = searchModes.find((m) => m.id === searchType)

  const renderSearchIcon = (iconType) => {
    switch (iconType) {
      case "simple":
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6" />
            <path d="M9 13h6" />
            <path d="M9 17h4" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-8 4 5 5-9" />
          </svg>
        )
    }
  }

  const currentModel = aiModels.find((m) => m.id === selectedModel) || aiModels[0]

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-end border-b border-border px-6 py-3">
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-lg p-2 hover:bg-secondary transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </button>
          <NotificationsDropdown isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center px-4 pt-24">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-center text-3xl font-semibold text-foreground text-balance">
            What are you searching for?
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Get accurate answers with line-by-line source citations
          </p>

          {/* Model Selector */}
          <div className="mt-6 flex justify-center">
            <div className="relative" ref={modelDropdownRef}>
              <button
                type="button"
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/20">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
                <span>{currentModel.name}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${showModelSelector ? "rotate-180" : ""}`}
                />
              </button>

              {showModelSelector && (
                <div className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-xl border border-border bg-card shadow-xl z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Select Model</div>
                    {aiModels.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(model.id)
                          setShowModelSelector(false)
                        }}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-secondary transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{model.name}</span>
                            <span className="text-xs text-muted-foreground">{model.provider}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{model.description}</div>
                        </div>
                        {selectedModel === model.id && <Check className="h-5 w-5 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="rounded-xl border border-border bg-card p-1">
              {/* Mode Toggles */}
              <div className="flex items-center gap-1 px-3 py-2">
                <button type="button" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode("web")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    searchMode === "web"
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Web
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode("papers")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    searchMode === "papers"
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Papers
                </button>
              </div>

              {/* Input */}
              <div className="relative">
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything"
                  rows={1}
                  className="w-full resize-none bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* Bottom Bar */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || isSearching}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Agents Section */}
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold text-foreground">Agents</span>
              <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">Beta</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
