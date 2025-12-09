"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

const initialMessages = [
  { id: 1, sender: "Alice Johnson", content: "Hey! How are you doing?", time: "10:30 AM", isMe: false },
  { id: 2, sender: "Me", content: "I'm doing great, thanks! How about you?", time: "10:32 AM", isMe: true },
  {
    id: 3,
    sender: "Alice Johnson",
    content: "Pretty good! Are we still on for tomorrow?",
    time: "10:33 AM",
    isMe: false,
  },
  { id: 4, sender: "Me", content: "Looking forward to it.", time: "10:35 AM", isMe: true },
  { id: 5, sender: "Alice Johnson", content: "See you tomorrow!", time: "10:36 AM", isMe: false },
]

export function ChatMain() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (!newMessage.trim()) return
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "Me",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      },
    ])
    setNewMessage("")
  }

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground">AJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">Alice Johnson</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={handleSend} size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}
