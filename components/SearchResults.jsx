"use client"

import { useState, useRef, useEffect } from "react"
import {
  Globe,
  FileText,
  ArrowUp,
  ExternalLink,
  BookOpen,
  Sparkles,
  Paperclip,
  Bell,
  Check,
  Info,
  AlertCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

export default function SearchResults({ results, onNewSearch, searchMode, setSearchMode, onSearch }) {
  const [followUpQuery, setFollowUpQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleFollowUp = (e) => {
    e.preventDefault()
    if (followUpQuery.trim()) {
      onSearch(followUpQuery)
      setFollowUpQuery("")
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-end border-b border-border bg-background/95 px-6 py-3 backdrop-blur">
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

      {/* Results Content */}
      <div className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Query Display */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {results.mode === "papers" ? <FileText className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              <span>{results.mode === "papers" ? "Academic Papers" : "Web Search"}</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{results.query}</h1>
          </div>

          {/* Answer Section */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">AI Answer</span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">{results.answer}</p>
            </div>
          </div>

          {/* Sources Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Sources</span>
              <span className="text-sm text-muted-foreground">({results.sources.length})</span>
            </div>
            <div className="space-y-3">
              {results.sources.map((source, index) => (
                <div
                  key={source.id}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-secondary text-xs font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {source.title}
                    </h3>
                    {results.mode === "papers" ? (
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{source.authors}</span>
                        <span>·</span>
                        <span>{source.journal}</span>
                        <span>·</span>
                        <span>{source.year}</span>
                        <span>·</span>
                        <span>{source.citations} citations</span>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{source.domain}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up Search */}
          <form onSubmit={handleFollowUp} className="rounded-xl border border-border bg-card p-1">
            <div className="flex items-center gap-1 px-3 py-2">
              <button type="button" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                onClick={() => setSearchMode("web")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  searchMode === "web" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
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
            <div className="relative">
              <textarea
                value={followUpQuery}
                onChange={(e) => setFollowUpQuery(e.target.value)}
                placeholder="Ask a follow-up question..."
                rows={1}
                className="w-full resize-none bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <button type="button" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                type="submit"
                disabled={!followUpQuery.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
