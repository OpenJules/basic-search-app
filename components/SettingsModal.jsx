"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Bell, Shield, Palette, Globe, CreditCard, HelpCircle } from "lucide-react"

const settingsSections = [
  { id: "account", name: "Account", icon: User },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "privacy", name: "Privacy & Security", icon: Shield },
  { id: "appearance", name: "Appearance", icon: Palette },
  { id: "language", name: "Language & Region", icon: Globe },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "help", name: "Help & Support", icon: HelpCircle },
]

export default function SettingsModal({ isOpen, onClose, theme, setTheme }) {
  const [activeSection, setActiveSection] = useState("account")

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="flex h-[600px] w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        >
          {/* Sidebar */}
          <div className="w-56 border-r border-border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Settings</h2>
            <nav className="flex flex-col gap-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">
                {settingsSections.find((s) => s.id === activeSection)?.name}
              </h3>
              <button onClick={onClose} className="rounded-lg p-2 hover:bg-secondary transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-6">
              {activeSection === "account" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-medium text-white">
                      U
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">User</h4>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Display Name</label>
                      <input
                        type="text"
                        defaultValue="User"
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Theme</h4>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 rounded-lg border-2 p-4 transition-colors ${
                          theme === "light" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="mb-2 h-12 rounded-md bg-white border border-gray-200" />
                        <span className="text-sm text-foreground">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 rounded-lg border-2 p-4 transition-colors ${
                          theme === "dark" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="mb-2 h-12 rounded-md bg-zinc-900 border border-zinc-700" />
                        <span className="text-sm text-foreground">Dark</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Accent Color</h4>
                    <div className="flex gap-2">
                      {["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"].map((color) => (
                        <button
                          key={color}
                          className="h-8 w-8 rounded-full border-2 border-transparent hover:border-foreground/30 transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-4">
                  {[
                    { label: "Email notifications", description: "Receive updates via email" },
                    { label: "Push notifications", description: "Get notified on your device" },
                    { label: "Research alerts", description: "New papers matching your interests" },
                    { label: "Weekly digest", description: "Summary of your research activity" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <button className="relative h-6 w-11 rounded-full bg-secondary transition-colors">
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-muted-foreground transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "privacy" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">Data Collection</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Control how your data is collected and used to improve our services.
                    </p>
                    <button className="mt-3 text-sm text-primary hover:underline">Manage preferences</button>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">Download Your Data</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Request a copy of all your data stored on our platform.
                    </p>
                    <button className="mt-3 text-sm text-primary hover:underline">Request download</button>
                  </div>
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                    <h4 className="font-medium text-red-500">Delete Account</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="mt-3 text-sm text-red-500 hover:underline">Delete account</button>
                  </div>
                </div>
              )}

              {["language", "billing", "help"].includes(activeSection) && (
                <div className="flex h-48 items-center justify-center text-muted-foreground">
                  <p>Settings for {settingsSections.find((s) => s.id === activeSection)?.name} coming soon</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
