"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Package, User2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/lib/mockStore";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";

export function DonationCard({ d, index = 0 }) {
  const { role, user, acceptDonation, deliverDonation } = useStore();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-3xl border border-border bg-gradient-card p-5 shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {d.foodType === "veg" ? "🥬 Vegetarian" : "🍗 Non-veg"} · {d.donorName}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-balance">{d.foodName}</h3>
        </div>
        <StatusBadge status={d.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info
          icon={<Package className="h-3.5 w-3.5" />}
          label="Quantity"
          value={`${d.quantityKg} kg`}
        />
        <Info
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Distance"
          value={`${d.distanceKm} km`}
        />
        <Info
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Pickup"
          value={formatDistanceToNow(new Date(d.pickupTime), { addSuffix: true })}
        />
        <Info
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Location"
          value={d.pickupLocation}
          truncate
        />
      </div>

      {d.notes && (
        <p className="mt-4 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
          {d.notes}
        </p>
      )}

      {d.acceptedBy && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-info/10 px-3 py-2 text-xs text-info">
          <User2 className="h-3.5 w-3.5" /> Accepted by{" "}
          <span className="font-semibold">{d.acceptedBy}</span>
        </div>
      )}

      {role === "volunteer" && d.status === "AVAILABLE" && (
        <Button
          onClick={() => acceptDonation(d.id, user.name)}
          className="mt-5 rounded-full bg-gradient-mint text-primary-foreground shadow-glow hover:opacity-90"
        >
          Accept Request
        </Button>
      )}
      {role === "volunteer" && d.status === "ACCEPTED" && d.acceptedBy === user.name && (
        <Button
          onClick={() => deliverDonation(d.id)}
          className="mt-5 rounded-full bg-success text-success-foreground hover:opacity-90"
        >
          Mark as Delivered
        </Button>
      )}
    </motion.article>
  );
}

function Info({ icon, label, value, truncate }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <p className={`mt-0.5 font-medium ${truncate ? "truncate" : ""}`}>{value}</p>
    </div>
  );
}
