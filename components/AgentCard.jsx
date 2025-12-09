"use client"

import { ClipboardList, FlaskConical, GitBranch, Users, Lightbulb, Quote } from "lucide-react"

const iconMap = {
  survey: ClipboardList,
  hypothesis: FlaskConical,
  tracer: GitBranch,
  simulator: Users,
  lightbulb: Lightbulb,
  citation: Quote,
}

export default function AgentCard({ agent }) {
  const Icon = iconMap[agent.icon] || ClipboardList

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50">
      <div className="mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <h3 className="font-semibold text-foreground">{agent.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
      <button className="mt-4 w-full rounded-lg bg-secondary py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
        {agent.action}
      </button>
    </div>
  )
}
