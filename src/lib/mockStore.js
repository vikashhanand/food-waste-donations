import { create } from "zustand";

const now = () => new Date().toISOString();
const inHours = (h) => new Date(Date.now() + h * 3600_000).toISOString();
const ago = (h) => new Date(Date.now() - h * 3600_000).toISOString();

const seed = [
  {
    id: "d1",
    foodName: "Vegetable Biryani",
    quantityKg: 12,
    pickupLocation: "Spice Garden, MG Road",
    pickupTime: inHours(2),
    foodType: "veg",
    expiryTime: inHours(5),
    notes: "Freshly cooked, in sealed containers",
    donorName: "Spice Garden Restaurant",
    status: "AVAILABLE",
    distanceKm: 1.8,
    createdAt: ago(0.3),
    compliance: {
      preparedAt: ago(1),
      storage: "Hot hold 65°C",
      packaging: "Sealed foil",
      tempRange: "60-70°C",
    },
  },
  {
    id: "d2",
    foodName: "Fresh Bread & Pastries",
    quantityKg: 6,
    pickupLocation: "Crust Bakery, 5th Ave",
    pickupTime: inHours(1),
    foodType: "veg",
    expiryTime: inHours(8),
    donorName: "Crust Bakery",
    status: "ACCEPTED",
    acceptedBy: "Aarav S.",
    distanceKm: 3.2,
    createdAt: ago(1),
    compliance: {
      preparedAt: ago(3),
      storage: "Room temp",
      packaging: "Paper bags",
      tempRange: "20-24°C",
    },
  },
  {
    id: "d3",
    foodName: "Chicken Curry & Rice",
    quantityKg: 18,
    pickupLocation: "Hotel Riverside",
    pickupTime: ago(2),
    foodType: "non-veg",
    expiryTime: ago(0.5),
    donorName: "Hotel Riverside",
    status: "DELIVERED",
    acceptedBy: "Maya L.",
    distanceKm: 4.5,
    createdAt: ago(6),
    compliance: {
      preparedAt: ago(8),
      storage: "Refrigerated",
      packaging: "Vacuum sealed",
      tempRange: "2-5°C",
    },
  },
  {
    id: "d4",
    foodName: "Mixed Salads",
    quantityKg: 4,
    pickupLocation: "Green Bowl Cafe",
    pickupTime: inHours(3),
    foodType: "veg",
    expiryTime: inHours(6),
    donorName: "Green Bowl Cafe",
    status: "AVAILABLE",
    distanceKm: 2.4,
    createdAt: ago(0.1),
    compliance: {
      preparedAt: ago(0.5),
      storage: "Refrigerated",
      packaging: "Plastic boxes",
      tempRange: "2-5°C",
    },
  },
];

export const useStore = create((set) => ({
  role: "donor",
  setRole: (role) => set({ role }),
  user: { name: "" }, // Guest by default
  setUser: (user) => set({ user }),
  donations: seed,
  notifications: [
    {
      id: "n1",
      title: "New donation nearby",
      message: "Vegetable Biryani · 1.8 km away",
      read: false,
      createdAt: ago(0.2),
    },
    {
      id: "n2",
      title: "Pickup confirmed",
      message: "Aarav accepted Fresh Bread & Pastries",
      read: false,
      createdAt: ago(0.8),
    },
    {
      id: "n3",
      title: "Delivered",
      message: "Chicken Curry delivered to Hope Shelter",
      read: true,
      createdAt: ago(5),
    },
  ],
  addDonation: (d) =>
    set((s) => {
      const id = "d" + Math.random().toString(36).slice(2, 8);
      const donation = {
        ...d,
        id,
        status: "AVAILABLE",
        createdAt: now(),
        donorName: s.user.name,
        distanceKm: +(Math.random() * 5 + 0.5).toFixed(1),
      };
      const notif = {
        id: "n" + id,
        title: "New donation nearby",
        message: `${d.foodName} · ${donation.distanceKm} km away`,
        read: false,
        createdAt: now(),
      };
      return { donations: [donation, ...s.donations], notifications: [notif, ...s.notifications] };
    }),
  acceptDonation: (id, volunteer) =>
    set((s) => ({
      donations: s.donations.map((d) =>
        d.id === id ? { ...d, status: "ACCEPTED", acceptedBy: volunteer } : d,
      ),
      notifications: [
        {
          id: "n" + Math.random().toString(36).slice(2, 8),
          title: "Pickup accepted",
          message: `${volunteer} is on the way`,
          read: false,
          createdAt: now(),
        },
        ...s.notifications,
      ],
    })),
  deliverDonation: (id) =>
    set((s) => ({
      donations: s.donations.map((d) => (d.id === id ? { ...d, status: "DELIVERED" } : d)),
      notifications: [
        {
          id: "n" + Math.random().toString(36).slice(2, 8),
          title: "Delivered",
          message: "Meals reached people in need 💚",
          read: false,
          createdAt: now(),
        },
        ...s.notifications,
      ],
    })),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
}));
