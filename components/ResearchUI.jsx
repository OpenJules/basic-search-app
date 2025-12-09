"use client"

import { useEffect, useState } from "react"
import ResearchSidebar from "./ResearchSidebar"
import SearchHome from "./SearchHome"
import SearchResults from "./SearchResults"

export default function ResearchUI() {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme")
    if (saved) return saved
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark"
    return "dark" // Default to dark to match Liner
  })

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark")
      else document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", theme)
      document.documentElement.style.colorScheme = theme
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchMode, setSearchMode] = useState("web") // "web" | "papers"
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [history, setHistory] = useState([
    { id: "1", query: "Machine learning optimization techniques", date: "2024-01-15" },
    { id: "2", query: "Transformer architecture explained", date: "2024-01-14" },
    { id: "3", query: "Neural network regularization methods", date: "2024-01-13" },
  ])

  const handleSearch = (query) => {
    if (!query.trim()) return
    setSearchQuery(query)
    setIsSearching(true)

    // Add to history
    setHistory((prev) => [
      { id: Date.now().toString(), query, date: new Date().toISOString().split("T")[0] },
      ...prev.slice(0, 19),
    ])

    // Simulate search
    setTimeout(() => {
      setSearchResults({
        query,
        mode: searchMode,
        answer: `Based on my analysis of ${searchMode === "papers" ? "academic literature" : "web sources"}, here's what I found about "${query}":\n\nThis is a comprehensive overview of the topic with citations from multiple sources. The research indicates several key findings that are relevant to your query.`,
        sources:
          searchMode === "papers"
            ? [
                {
                  id: 1,
                  title: "Deep Learning: A Comprehensive Survey",
                  authors: "Smith et al.",
                  journal: "Nature Machine Intelligence",
                  year: 2024,
                  citations: 1250,
                },
                {
                  id: 2,
                  title: "Attention Mechanisms in Neural Networks",
                  authors: "Johnson & Lee",
                  journal: "ICML Proceedings",
                  year: 2023,
                  citations: 890,
                },
                {
                  id: 3,
                  title: "Optimization Methods for Large-Scale Learning",
                  authors: "Brown et al.",
                  journal: "JMLR",
                  year: 2023,
                  citations: 567,
                },
              ]
            : [
                {
                  id: 1,
                  title: "Understanding Machine Learning Fundamentals",
                  url: "https://example.com/ml-basics",
                  domain: "example.com",
                },
                {
                  id: 2,
                  title: "A Practical Guide to Deep Learning",
                  url: "https://deeplearning.ai/guide",
                  domain: "deeplearning.ai",
                },
                {
                  id: 3,
                  title: "Introduction to Neural Networks",
                  url: "https://stanford.edu/nn-intro",
                  domain: "stanford.edu",
                },
              ],
      })
      setIsSearching(false)
    }, 1500)
  }

  const handleNewSearch = () => {
    setSearchResults(null)
    setSearchQuery("")
  }

  const handleHistoryClick = (item) => {
    handleSearch(item.query)
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <ResearchSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        history={history}
        onHistoryClick={handleHistoryClick}
        onNewSearch={handleNewSearch}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-1 overflow-y-auto">
        {searchResults ? (
          <SearchResults
            results={searchResults}
            onNewSearch={handleNewSearch}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            onSearch={handleSearch}
          />
        ) : (
          <SearchHome
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            isSearching={isSearching}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        )}
      </main>
    </div>
  )
}
