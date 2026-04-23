import { cn } from "@/lib/utils";

const map = {
  AVAILABLE: {
    label: "Available",
    cls: "bg-warning/15 text-warning-foreground border-warning/30",
    dot: "bg-warning",
  },
  ACCEPTED: { label: "Accepted", cls: "bg-info/15 text-info border-info/30", dot: "bg-info" },
  DELIVERED: {
    label: "Delivered",
    cls: "bg-success/15 text-success border-success/30",
    dot: "bg-success",
  },
};

export function StatusBadge({ status }) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        s.cls,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
