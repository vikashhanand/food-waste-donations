"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DollarSign, Package, Sparkles, Utensils } from "lucide-react";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { DonationCard } from "@/components/DonationCard";
import { DonationForm } from "@/components/DonationForm";
import { useStore } from "@/lib/mockStore";

export default function DashboardPage() {
  const { role, donations, user: storeUser } = useStore();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Fallback to store user if no localStorage (for dev/first login)
      setUser(storeUser);
    }
  }, [storeUser]);

  if (!user) return null;

  const visible =
    role === "donor"
      ? donations.filter((d) => d.donorName === user.name || d.donorName.includes("Spice") || true)
      : role === "volunteer"
        ? [...donations].sort((a, b) => a.distanceKm - b.distanceKm)
        : donations;

  const totalKg = donations.reduce((s, d) => s + d.quantityKg, 0);
  const meals = Math.round(totalKg * 2.5);
  const taxValue = Math.round(totalKg * 6.5);
  const impact = Math.min(
    100,
    Math.round(
      (donations.filter((d) => d.status === "DELIVERED").length / Math.max(donations.length, 1)) *
        100,
    ),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {role} workspace
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {role === "donor" && `Welcome back, ${user.name.split(' ')[0]}`}
            {role === "volunteer" && "Pickups near you"}
            {role === "ngo" && "Operations overview"}
          </h1>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Package}
            label="Total donated"
            value={`${totalKg} kg`}
            hint="across all listings"
            tint="primary"
          />
          <StatCard
            icon={Utensils}
            label="Meals provided"
            value={`${meals.toLocaleString()}`}
            hint="≈ 2.5 meals / kg"
            tint="success"
            delay={0.05}
          />
          <StatCard
            icon={DollarSign}
            label="Tax deductible"
            value={`$${taxValue}`}
            hint="estimated value"
            tint="info"
            delay={0.1}
          />
          <StatCard
            icon={Sparkles}
            label="Impact score"
            value={`${impact}%`}
            hint="completion rate"
            tint="warning"
            delay={0.15}
          />
        </div>

        {role === "donor" && (
          <div className="mt-8">
            <DonationForm />
          </div>
        )}

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                {role === "volunteer" ? "Available pickups" : "Recent donations"}
              </h2>
              <p className="text-sm text-muted-foreground">{visible.length} listings</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((d, i) => (
              <DonationCard key={d.id} d={d} index={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
