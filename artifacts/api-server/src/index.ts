import app from "./app";
import { logger } from "./lib/logger";
import bcrypt from "bcryptjs";
import { db, adminsTable, productsTable } from "@workspace/db";
import { count } from "drizzle-orm";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function seed() {
  try {
    const [adminCount] = await db.select({ value: count() }).from(adminsTable);
    if (adminCount.value === 0) {
      logger.info("Seeding initial admin...");
      const passwordHash = await bcrypt.hash("GymDrop2025!", 12);
      await db.insert(adminsTable).values({
        username: "admin",
        passwordHash,
      });
      logger.info("Initial admin seeded.");
    }

    const [productCount] = await db.select({ value: count() }).from(productsTable);
    if (productCount.value === 0) {
      logger.info("Seeding initial products...");
      const initialProducts = [
        {
          name: "Magnetic Gym Bottle",
          description: "The magnetic bottle every GymTok creator uses",
          price: 39.99,
          badge: "Viral",
          rating: 4.9,
          reviewCount: 5100,
          category: "trending" as const,
          imageUrl: "/bottle.png",
          active: true,
        },
        {
          name: "Lifting Belt Pro X",
          description: "The belt serious powerlifters swear by",
          price: 89.99,
          badge: "Best Seller",
          rating: 4.9,
          reviewCount: 2400,
          category: "trending" as const,
          imageUrl: "/lifting-belt.png",
          active: true,
        },
        {
          name: "Adjustable Dumbbells 50lb",
          description: "Space-saving. Heavy-duty. Worth every cent.",
          price: 249.99,
          badge: "Hot",
          rating: 4.8,
          reviewCount: 1800,
          category: "trending" as const,
          imageUrl: "/dumbbells.png",
          active: true,
        },
        {
          name: "Resistance Band Kit",
          description: "Versatile training in one kit",
          price: 34.99,
          badge: "Top Rated",
          rating: 4.7,
          reviewCount: 3100,
          category: "trending" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Weight Lifting Straps",
          description: "Never lose grip on a heavy set again",
          price: 19.99,
          badge: "#1 Pick",
          rating: 4.9,
          reviewCount: 4200,
          category: "trending" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Pull-Up Bar Steel",
          description: "No-install bar that holds serious weight",
          price: 64.99,
          badge: "Popular",
          rating: 4.6,
          reviewCount: 1200,
          category: "trending" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Pre-Workout Alpha",
          description: "The pre-workout going viral on gym TikTok",
          price: 44.99,
          badge: "Trending",
          rating: 4.8,
          reviewCount: 2700,
          category: "trending" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Smart Jump Rope",
          description: "Counts reps. Tracks calories. Levels up cardio.",
          price: 49.99,
          badge: "Tech Pick",
          rating: 4.7,
          reviewCount: 890,
          category: "gadgets" as const,
          imageUrl: "/jump-rope.png",
          active: true,
        },
        {
          name: "Muscle Stim Device",
          description: "Recovery tech used by pro athletes",
          price: 129.99,
          badge: "Editor's Choice",
          rating: 4.8,
          reviewCount: 650,
          category: "gadgets" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Resistance Trainer",
          description: "Cable machine vibes, apartment budget",
          price: 79.99,
          badge: "Upgrade",
          rating: 4.6,
          reviewCount: 1100,
          category: "gadgets" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Grip Strengthener Pro",
          description: "The underrated tool every lifter needs",
          price: 24.99,
          badge: "Essential",
          rating: 4.9,
          reviewCount: 3300,
          category: "gadgets" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Compression Shorts",
          description: "Feels like a second skin. Lasts forever.",
          price: 39.99,
          badge: "Comfort",
          rating: 4.7,
          reviewCount: 1500,
          category: "gear" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Knee Sleeves (Pair)",
          description: "Squat deeper. Protect your joints.",
          price: 54.99,
          badge: "Protection",
          rating: 4.8,
          reviewCount: 2000,
          category: "gear" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Gym Gloves Pro",
          description: "No calluses. Maximum grip on every pull.",
          price: 29.99,
          badge: "Grip",
          rating: 4.6,
          reviewCount: 2200,
          category: "gear" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
        {
          name: "Foam Roller XL",
          description: "The recovery tool you'll use every single day",
          price: 44.99,
          badge: "Recovery",
          rating: 4.9,
          reviewCount: 3400,
          category: "gear" as const,
          imageUrl: "/placeholder.png",
          active: true,
        },
      ];
      await db.insert(productsTable).values(initialProducts);
      logger.info("Initial products seeded.");
    }
  } catch (err) {
    logger.error({ err }, "Error seeding database");
  }
}

seed().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
});
