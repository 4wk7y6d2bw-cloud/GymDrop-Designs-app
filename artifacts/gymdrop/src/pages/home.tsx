import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ShieldCheck, Zap, Trophy } from "lucide-react";

export default function Home() {
  const trendingGear = [
    { name: "Lifting Belt Pro X", price: "$89.99", badge: "Best Seller", rating: "4.9", image: "/lifting-belt.png" },
    { name: "Adjustable Dumbbells 50lb", price: "$249.99", badge: "Hot", rating: "4.8", image: "/dumbbells.png" },
    { name: "Resistance Band Kit", price: "$34.99", badge: "Top Rated", rating: "4.7" },
    { name: "Weight Lifting Straps", price: "$19.99", badge: "#1 Pick", rating: "4.9" },
    { name: "Pull-Up Bar Steel", price: "$64.99", badge: "Popular", rating: "4.6" },
    { name: "Pre-Workout Alpha", price: "$44.99", badge: "Trending", rating: "4.8" },
  ];

  const gymGadgets = [
    { name: "Smart Jump Rope", price: "$49.99", badge: "Tech Pick", rating: "4.7", image: "/jump-rope.png" },
    { name: "Muscle Stim Device", price: "$129.99", badge: "Editor's Choice", rating: "4.8" },
    { name: "Resistance Trainer", price: "$79.99", badge: "Upgrade", rating: "4.6" },
    { name: "Grip Strengthener Pro", price: "$24.99", badge: "Essential", rating: "4.9" },
  ];

  const fitnessGear = [
    { name: "Compression Shorts", price: "$39.99", badge: "Comfort", rating: "4.7" },
    { name: "Knee Sleeves (Pair)", price: "$54.99", badge: "Protection", rating: "4.8" },
    { name: "Gym Gloves Pro", price: "$29.99", badge: "Grip", rating: "4.6" },
    { name: "Foam Roller XL", price: "$44.99", badge: "Recovery", rating: "4.9" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Dark warehouse gym" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="container relative z-10 px-4 pt-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter mb-4">
              Dominate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-red-800">
                The Iron
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-8 font-medium"
          >
            Raw gear for serious lifters. No fluff. No excuses. Equip yourself for the next max out.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="h-16 px-10 text-xl font-display uppercase tracking-widest font-bold bg-primary hover:bg-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all duration-300" asChild>
              <a href="#trending">
                Gear Up Now <ArrowRight className="ml-2 h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-muted-foreground"
        >
          <span className="text-xs font-display uppercase tracking-widest mb-2">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-display uppercase font-bold text-lg tracking-wider mb-1">Elite Quality</h3>
              <p className="text-sm text-muted-foreground">Tested in the harshest gym environments.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Zap className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-display uppercase font-bold text-lg tracking-wider mb-1">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Get your gear before your next workout.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Trophy className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-display uppercase font-bold text-lg tracking-wider mb-1">Champion Endorsed</h3>
              <p className="text-sm text-muted-foreground">Used by competitive lifters worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Gear Section */}
      <section id="trending" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
                Trending <span className="text-primary">Gear</span>
              </h2>
              <p className="text-muted-foreground mt-2">The most sought-after equipment right now.</p>
            </div>
            <Button variant="outline" className="font-display uppercase font-bold tracking-wider">
              View All Gear
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingGear.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page Banner */}
      <section className="py-24 bg-card relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
              Built for <br/> <span className="text-primary">Performance</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We curate only the highest quality affiliate gear. If we wouldn't use it in our own warehouse gym, we don't feature it here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gym Gadgets Section */}
      <section id="gadgets" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              Gym <span className="text-primary">Gadgets</span>
            </h2>
            <p className="text-muted-foreground mt-2">Smart tech to optimize your training.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymGadgets.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Gear Section */}
      <section id="gear" className="py-24 relative bg-card/30 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              Fitness <span className="text-primary">Gear</span>
            </h2>
            <p className="text-muted-foreground mt-2">Apparel and accessories to keep you protected.</p>
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
