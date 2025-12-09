import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle } from "lucide-react"

const conversations = [
  { id: 1, name: "Alice Johnson", lastMessage: "See you tomorrow!", time: "2m ago", avatar: "AJ" },
  { id: 2, name: "Bob Smith", lastMessage: "That sounds great!", time: "1h ago", avatar: "BS" },
  { id: 3, name: "Carol White", lastMessage: "Thanks for the help", time: "3h ago", avatar: "CW" },
  { id: 4, name: "David Brown", lastMessage: "Let me check on that", time: "Yesterday", avatar: "DB" },
]

export function ChatSidebar() {
  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-foreground">Messages</h1>
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full px-3 py-2 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
            >
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">{convo.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{convo.name}</span>
                  <span className="text-xs text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
