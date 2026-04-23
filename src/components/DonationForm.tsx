import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useStore } from "@/lib/mockStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DonationForm() {
  const addDonation = useStore((s) => s.addDonation);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    foodName: "",
    quantityKg: 5,
    pickupLocation: "",
    pickupTime: new Date(Date.now() + 2 * 3600_000).toISOString().slice(0, 16),
    foodType: "veg" as "veg" | "non-veg",
    expiryTime: new Date(Date.now() + 6 * 3600_000).toISOString().slice(0, 16),
    notes: "",
    storage: "Refrigerated",
    packaging: "Sealed containers",
    tempRange: "2-5°C",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.foodName || !form.pickupLocation) return;
    addDonation({
      foodName: form.foodName,
      quantityKg: Number(form.quantityKg),
      pickupLocation: form.pickupLocation,
      pickupTime: new Date(form.pickupTime).toISOString(),
      foodType: form.foodType,
      expiryTime: new Date(form.expiryTime).toISOString(),
      notes: form.notes,
      compliance: {
        preparedAt: new Date().toISOString(),
        storage: form.storage,
        packaging: form.packaging,
        tempRange: form.tempRange,
      },
    });
    setForm({ ...form, foodName: "", pickupLocation: "", notes: "" });
    setOpen(false);
  };

  return (
    <div className="rounded-3xl border border-border bg-gradient-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Post a donation</h2>
          <p className="text-sm text-muted-foreground">Share surplus food with people who need it.</p>
        </div>
        <Button onClick={() => setOpen((o) => !o)} className="rounded-full bg-gradient-mint text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="mr-1 h-4 w-4" /> {open ? "Close" : "New donation"}
        </Button>
      </div>

      {open && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={submit}
          className="mt-5 grid gap-4 md:grid-cols-2"
        >
          <Field label="Food name">
            <Input value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })} placeholder="e.g. Pasta with marinara" required />
          </Field>
          <Field label="Quantity (kg)">
            <Input type="number" min={0.5} step={0.5} value={form.quantityKg} onChange={(e) => setForm({ ...form, quantityKg: Number(e.target.value) })} />
          </Field>
          <Field label="Pickup location">
            <Input value={form.pickupLocation} onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })} placeholder="Address" required />
          </Field>
          <Field label="Food type">
            <div className="flex gap-2">
              {(["veg", "non-veg"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, foodType: t })}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    form.foodType === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  {t === "veg" ? "🥬 Veg" : "🍗 Non-veg"}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Pickup time">
            <Input type="datetime-local" value={form.pickupTime} onChange={(e) => setForm({ ...form, pickupTime: e.target.value })} />
          </Field>
          <Field label="Expiry time">
            <Input type="datetime-local" value={form.expiryTime} onChange={(e) => setForm({ ...form, expiryTime: e.target.value })} />
          </Field>
          <Field label="Storage">
            <Input value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })} />
          </Field>
          <Field label="Packaging">
            <Input value={form.packaging} onChange={(e) => setForm({ ...form, packaging: e.target.value })} />
          </Field>
          <Field label="Safe temperature range">
            <Input value={form.tempRange} onChange={(e) => setForm({ ...form, tempRange: e.target.value })} />
          </Field>
          <Field label="Notes (optional)" full>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
          </Field>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Publish donation
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
