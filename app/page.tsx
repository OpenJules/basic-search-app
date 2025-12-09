import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatMain } from "@/components/chat-main"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}
