"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Star,
  FolderOpen,
  Lightbulb,
  FlaskConical,
  Quote,
  BookOpen,
  GitBranch,
  ClipboardList,
  Users,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import SettingsModal from "./SettingsModal"

const agents = [
  { id: "hypothesis-gen", name: "Hypothesis Generator", icon: Lightbulb },
  { id: "hypothesis-eval", name: "Hypothesis Evaluator", icon: FlaskConical },
  { id: "citation", name: "Citation Recommender", icon: Quote },
  { id: "literature", name: "Literature Review", icon: BookOpen },
  { id: "research-tracer", name: "Research Tracer", icon: GitBranch },
  { id: "survey-gen", name: "Survey Generator", icon: ClipboardList },
  { id: "survey-sim", name: "Survey Simulator", icon: Users },
  { id: "peer-review", name: "Peer Review", icon: MessageSquare },
]

export default function ResearchSidebar({
  collapsed,
  setCollapsed,
  history = [],
  onHistoryClick,
  onNewSearch,
  theme,
  setTheme,
}) {
  const [agentsExpanded, setAgentsExpanded] = useState(true)
  const [historyExpanded, setHistoryExpanded] = useState(true)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 240 }}
        animate={{ width: 64 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex h-full shrink-0 flex-col border-r border-border bg-background"
      >
        <div className="flex items-center justify-center border-b border-border p-3">
          <button
            onClick={() => setCollapsed(false)}
            className="rounded-lg p-2 hover:bg-secondary transition-colors"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 p-2">
          <button
            onClick={onNewSearch}
            className="rounded-lg p-2.5 hover:bg-secondary transition-colors"
            title="New question"
          >
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-lg p-2.5 hover:bg-secondary transition-colors" title="Source collection">
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="rounded-lg p-2.5 hover:bg-secondary transition-colors" title="Starred">
            <Star className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </motion.aside>
    )
  }

  return (
    <>
      <motion.aside
        initial={{ width: 64 }}
        animate={{ width: 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-background"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                <path
                  d="M2 17l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-foreground">Scholar</span>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-0.5 px-2 pt-3">
          <button
            onClick={onNewSearch}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New question</span>
            <span className="ml-auto text-xs text-muted-foreground">Ctrl K</span>
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
            <FolderOpen className="h-4 w-4" />
            <span>Source collection</span>
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
            <Star className="h-4 w-4" />
            <span>Starred</span>
          </button>
        </div>

        <div className="mt-4 px-2">
          <button
            onClick={() => setAgentsExpanded(!agentsExpanded)}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {agentsExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs font-medium text-muted-foreground">Agents</span>
            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">Beta</span>
          </button>
          <AnimatePresence>
            {agentsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-0.5 pt-1">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <agent.icon className="h-4 w-4 text-primary" />
                      <span>{agent.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History Section */}
        <div className="mt-4 flex-1 overflow-y-auto px-2">
          <button
            onClick={() => setHistoryExpanded(!historyExpanded)}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {historyExpanded ? (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-xs font-medium text-muted-foreground">History</span>
          </button>
          <AnimatePresence>
            {historyExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-0.5 pt-1">
                  {history.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onHistoryClick(item)}
                      className="flex items-start gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <span className="line-clamp-1">{item.query}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto border-t border-border p-3">
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-secondary transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-medium text-white">
                U
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">User</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Personal</span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-border bg-popover p-1 shadow-lg"
                >
                  <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setSettingsOpen(true)
                      setUserDropdownOpen(false)
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <div className="my-1 h-px bg-border" />
                  <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-secondary transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-2 flex justify-end">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </motion.aside>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} />
    </>
  )
}
