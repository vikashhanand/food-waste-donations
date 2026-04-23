"use client";

import { motion } from "framer-motion";
import { Activity, Globe, Leaf, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { format } from "date-fns";

const trend = [
  { day: "Mon", meals: 320, kg: 128 },
  { day: "Tue", meals: 410, kg: 164 },
  { day: "Wed", meals: 380, kg: 152 },
  { day: "Thu", meals: 520, kg: 208 },
  { day: "Fri", meals: 610, kg: 244 },
  { day: "Sat", meals: 740, kg: 296 },
  { day: "Sun", meals: 690, kg: 276 },
];

const categories = [
  { name: "Cooked meals", value: 42 },
  { name: "Bakery", value: 18 },
  { name: "Produce", value: 24 },
  { name: "Dairy", value: 16 },
];

const cities = [
  { city: "Mumbai", pickups: 312 },
  { city: "Delhi", pickups: 268 },
  { city: "Bangalore", pickups: 224 },
  { city: "Pune", pickups: 178 },
  { city: "Chennai", pickups: 142 },
];

const pieColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)", "var(--chart-5)"];

export default function AnalyticsPage() {
  // Use mock data for now or fetch from API
  const donations = [
    { id: '1', foodName: 'Meal A', compliance: { preparedAt: new Date().toISOString(), storage: 'Refrigerated', packaging: 'Sealed', tempRange: '4C' } }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Impact analytics
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Every meal counts
          </h1>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Activity}
            label="Meals served"
            value="48,210"
            hint="last 90 days"
            tint="success"
          />
          <StatCard
            icon={Leaf}
            label="CO₂ saved"
            value="62.8 t"
            hint="vs landfill baseline"
            tint="primary"
            delay={0.05}
          />
          <StatCard
            icon={Users}
            label="Active volunteers"
            value="1,420"
            hint="+12% this month"
            tint="info"
            delay={0.1}
          />
          <StatCard
            icon={Globe}
            label="Cities covered"
            value="12"
            hint="across 4 states"
            tint="warning"
            delay={0.15}
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft lg:col-span-2"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-lg font-semibold">Meals & kilograms rescued</h2>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <LineChart data={trend} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="meals"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="kg"
                    stroke="var(--chart-2)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft"
          >
            <h2 className="font-display text-lg font-semibold">Food categories</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {categories.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft lg:col-span-2"
          >
            <h2 className="font-display text-lg font-semibold">Pickups by city</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <BarChart data={cities}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="city" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  />
                  <Bar dataKey="pickups" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft"
          >
            <h2 className="font-display text-lg font-semibold">Compliance log</h2>
            <p className="text-xs text-muted-foreground">Health & safety records</p>
            <ul className="mt-4 space-y-3">
              {donations.map((d) => (
                <li key={d.id} className="rounded-2xl border border-border/60 bg-card p-3 text-xs">
                  <p className="font-semibold text-foreground">{d.foodName}</p>
                  <p className="mt-1 text-muted-foreground">
                    Prepared {format(new Date(d.compliance.preparedAt), "p, MMM d")} ·{" "}
                    {d.compliance.storage}
                  </p>
                  <p className="text-muted-foreground">
                    {d.compliance.packaging} · {d.compliance.tempRange}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
