"use client";

import { motion } from "framer-motion";
import { ArrowRight, HandHeart, Leaf, Truck, Users } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import heroImg from "@/assets/hero-food.jpg";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-soft"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Live in 12 cities · 1,420 active volunteers
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Turn surplus food into{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                shared meals
              </span>
              .
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              FoodSaver connects restaurants, volunteers and NGOs in real time — so good food
              reaches people, not landfills.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
              >
                Open dashboard{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-muted"
              >
                See impact
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <Stat n="48k+" label="Meals served" />
              <Stat n="22 t" label="Food rescued" />
              <Stat n="63 t" label="CO₂ saved" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-gradient-mint opacity-50 blur-2xl" />
            <Image
              src={heroImg}
              alt="Hands sharing crates of fresh food"
              width={1536}
              height={1024}
              className="rounded-[2rem] border border-border shadow-lift"
              priority
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-4 w-64 rounded-2xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur sm:-left-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Live alert
              </p>
              <p className="mt-1 text-sm font-semibold">12 kg Vegetable Biryani</p>
              <p className="text-xs text-muted-foreground">Spice Garden · 1.8 km · pickup in 2h</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          How FoodSaver works
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Three roles. One mission. Zero friction.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: HandHeart,
              title: "Donors post surplus",
              body: "Restaurants & kitchens log surplus food in seconds with full compliance details.",
            },
            {
              icon: Truck,
              title: "Volunteers dispatch",
              body: "Nearby volunteers get instant alerts and accept the closest pickup.",
            },
            {
              icon: Users,
              title: "NGOs deliver impact",
              body: "Track meals served, CO₂ saved, and tax-deductible value in real time.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-gradient-card p-6 shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-mint text-primary-foreground shadow-glow">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4" /> FoodSaver © {new Date().getFullYear()}
          </div>
          <p>Built with care for people & planet.</p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold">{n}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
