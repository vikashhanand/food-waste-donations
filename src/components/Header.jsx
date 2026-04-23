"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sprout, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/lib/mockStore";
import { cn } from "@/lib/utils";

const roles = [
  { value: "donor", label: "Donor" },
  { value: "volunteer", label: "Volunteer" },
  { value: "ngo", label: "NGO" },
];

export function Header() {
  const { role, setRole, notifications, markAllRead, user, setUser } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Sync user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, [setUser]);

  const unread = notifications.filter((n) => !n.read).length;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/analytics", label: "Analytics" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-mint shadow-glow">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </span>
          <span>FoodSaver</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full bg-muted p-1 sm:flex">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                  role === r.value
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setOpen((o) => !o);
                if (!open) markAllRead();
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-secondary"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
                >
                  {unread}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift"
                >
                  <div className="border-b border-border px-4 py-3">
                    <p className="font-semibold">Notifications</p>
                  </div>
                  <ul className="max-h-80 overflow-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className="border-b border-border/50 px-4 py-3 last:border-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                          {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {user.name && user.name !== "Guest" ? (
              <>
                <div className="hidden h-10 items-center gap-2 rounded-full bg-muted px-4 sm:flex transition hover:bg-muted/80">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" });
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                    } catch (err) {
                      console.error("Logout failed", err);
                    }
                  }}
                  className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
