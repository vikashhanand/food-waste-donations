"use client";

import { motion } from "framer-motion";

const tintMap = {
  primary: "bg-gradient-mint text-primary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
  info: "bg-info/15 text-info",
};

export function StatCard({ icon: Icon, label, value, hint, delay = 0, tint = "primary" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tintMap[tint]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </motion.div>
  );
}
