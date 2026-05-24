import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const trendingGear = [

    {
      name: "Magnetic Gym Bottle",
      price: "$39.99",
      badge: "Viral",
      rating: "4.9",
      reviews: "5.1k",
      image: "/bottle.png",
      description: "The magnetic bottle every GymTok creator uses",
      category: "ACCESSORIES"
    },
    
    { name: "Lifting Belt Pro X", price: "$89.99", badge: "Best Seller", rating: "4.9", reviews: "2.4k", image: "/lifting-belt.png", description: "The belt serious powerlifters swear by", category: "LIFTING GEAR" },
    { name: "Adjustable Dumbbells 50lb", price: "$249.99", badge: "Hot", rating: "4.8", reviews: "1.8k", image: "/dumbbells.png", description: "Space-saving. Heavy-duty. Worth every cent.", category: "WEIGHTS" },
    { name: "Resistance Band Kit", price: "$34.99", badge: "Top Rated", rating: "4.7", reviews: "3.1k", description: "Versatile training in one kit", category: "ACCESSORIES" },
    { name: "Weight Lifting Straps", price: "$19.99", badge: "#1 Pick", rating: "4.9", reviews: "4.2k", description: "Never lose grip on a heavy set again", category: "LIFTING GEAR" },
    { name: "Pull-Up Bar Steel", price: "$64.99", badge: "Popular", rating: "4.6", reviews: "1.2k", description: "No-install bar that holds serious weight", category: "HOME GYM" },
    { name: "Pre-Workout Alpha", price: "$44.99", badge: "Trending", rating: "4.8", reviews: "2.7k", description: "The pre-workout going viral on gym TikTok", category: "SUPPLEMENTS" },
  ];

  const gymGadgets = [
    { name: "Smart Jump Rope", price: "$49.99", badge: "Tech Pick", rating: "4.7", reviews: "890", image: "/jump-rope.png", description: "Counts reps. Tracks calories. Levels up cardio.", category: "CARDIO TECH" },
    { name: "Muscle Stim Device", price: "$129.99", badge: "Editor's Choice", rating: "4.8", reviews: "650", description: "Recovery tech used by pro athletes", category: "RECOVERY TECH" },
    { name: "Resistance Trainer", price: "$79.99", badge: "Upgrade", rating: "4.6", reviews: "1.1k", description: "Cable machine vibes, apartment budget", category: "SMART GYM" },
    { name: "Grip Strengthener Pro", price: "$24.99", badge: "Essential", rating: "4.9", reviews: "3.3k", description: "The underrated tool every lifter needs", category: "ACCESSORIES" },
  ];

  const fitnessGear = [
    { name: "Compression Shorts", price: "$39.99", badge: "Comfort", rating: "4.7", reviews: "1.5k", description: "Feels like a second skin. Lasts forever.", category: "APPAREL" },
    { name: "Knee Sleeves (Pair)", price: "$54.99", badge: "Protection", rating: "4.8", reviews: "2.0k", description: "Squat deeper. Protect your joints.", category: "SUPPORT" },
    { name: "Gym Gloves Pro", price: "$29.99", badge: "Grip", rating: "4.6", reviews: "2.2k", description: "No calluses. Maximum grip on every pull.", category: "ACCESSORIES" },
    { name: "Foam Roller XL", price: "$44.99", badge: "Recovery", rating: "4.9", reviews: "3.4k", description: "The recovery tool you'll use every single day", category: "RECOVERY" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dc2626] selection:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden border-b border-white/[0.02]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Dark warehouse gym" 
            className="w-full h-full object-cover opacity-20 scale-105 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.05)_0%,transparent_50%)]" />
        </div>

        <div className="container relative z-10 px-6 pt-32 pb-20 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="text-[#dc2626] text-xs font-display uppercase tracking-[0.2em] font-medium border border-[#dc2626]/20 bg-[#dc2626]/5 px-3 py-1 rounded-sm">
              GymDrop — Fitness Discovery
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] font-bold uppercase tracking-tight mb-6 text-white/90">
              Viral Gym <br/>
              <span className="text-white">Gear Ranked</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 max-w-xl mb-8 font-light leading-relaxed"
          >
            We find the best gym gear so you don't have to. Curated weekly from the trenches of fitness TikTok and Reddit.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <span className="text-xs text-white/40 border border-white/10 bg-white/5 px-3 py-1 rounded-sm font-mono">#GymFinds</span>
            <span className="text-xs text-white/40 border border-white/10 bg-white/5 px-3 py-1 rounded-sm font-mono">#FitnessGear</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="#finds" className="group inline-flex items-center gap-3 text-lg font-display uppercase tracking-widest text-white hover:text-[#dc2626] transition-colors border-b border-white/20 hover:border-[#dc2626] pb-1">
              Explore This Week's Picks
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden py-3">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="font-display text-sm tracking-[0.2em] uppercase text-white/30 mx-4">
                LIFTING BELT PRO <span className="text-[#dc2626] mx-4">·</span> 
                SMART JUMP ROPE <span className="text-[#dc2626] mx-4">·</span> 
                KNEE SLEEVES <span className="text-[#dc2626] mx-4">·</span> 
                PRE-WORKOUT <span className="text-[#dc2626] mx-4">·</span> 
                RESISTANCE BANDS <span className="text-[#dc2626] mx-4">·</span> 
                GYM GADGETS <span className="text-[#dc2626] mx-4">·</span> 
                GRIP STRENGTHENER <span className="text-[#dc2626] mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: Top Finds */}
      <section id="finds" className="py-24 relative bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-[#dc2626] text-xs font-display uppercase tracking-[0.2em] font-medium mb-3 block">Weekly Picks</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
              This Week's Top Finds
            </h2>
            <p className="text-white/50 text-lg font-light max-w-2xl">
              Curated from gym TikTok, Reddit, and real lifter reviews.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingGear.map((product, i) => (
              <ProductCard key={product.name} {...product} rank={i + 1} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Gadgets */}
      <section id="gadgets" className="py-24 relative bg-[#0f0f0f] border-y border-white/[0.02]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-[#dc2626] text-xs font-display uppercase tracking-[0.2em] font-medium mb-3 block">Tech & Gadgets</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
              Gym Gadgets Worth The Hype
            </h2>
            <p className="text-white/50 text-lg font-light max-w-2xl">
              Smart tools that actually make a difference.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <ProductCard {...gymGadgets[0]} rank={1} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {gymGadgets.slice(1).map((product, i) => (
                <ProductCard key={product.name} {...product} rank={i + 2} layout="horizontal" delay={i * 0.1 + 0.2} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Gear */}
      <section id="gear" className="py-24 relative bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-[#dc2626] text-xs font-display uppercase tracking-[0.2em] font-medium mb-3 block">Fitness Gear</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
              Gear That Goes Hard
            </h2>
            <p className="text-white/50 text-lg font-light max-w-2xl">
              Apparel and accessories built for real sessions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fitnessGear.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
