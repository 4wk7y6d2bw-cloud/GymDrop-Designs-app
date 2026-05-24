import { motion } from "framer-motion";
import { Star, Flame, Zap, Trophy, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  price: string;
  badge: string;
  rating: string;
  reviews?: string;
  image?: string;
  delay?: number;
  category?: string;
  description?: string;
  rank?: number;
  layout?: "vertical" | "horizontal";
}

export function ProductCard({ 
  name, 
  price, 
  badge, 
  rating, 
  reviews = "1k", 
  image, 
  delay = 0,
  category = "GEAR",
  description = "A premium fitness find.",
  rank,
  layout = "vertical"
}: ProductCardProps) {
  
  const getIconForBadge = (b: string) => {
    const bLower = b.toLowerCase();
    if (bLower.includes("hot") || bLower.includes("trending")) return <Flame className="w-3 h-3 mr-1" />;
    if (bLower.includes("pick") || bLower.includes("choice") || bLower.includes("seller")) return <Trophy className="w-3 h-3 mr-1" />;
    if (bLower.includes("tech") || bLower.includes("upgrade")) return <Zap className="w-3 h-3 mr-1" />;
    return <ShieldCheck className="w-3 h-3 mr-1" />;
  };

  if (layout === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -2 }}
        className="group relative bg-[#111] rounded flex flex-row transition-all duration-300 hover:border-l-[#dc2626] border-l-2 border-l-transparent border border-white/5 hover:shadow-[-10px_0_30px_rgba(220,38,38,0.05)] overflow-hidden"
      >
        <div className="w-1/3 min-w-[120px] bg-[#161616] relative overflow-hidden flex items-center justify-center border-r border-white/5">
          {rank && (
            <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm font-display border border-white/10">
              #{rank}
            </div>
          )}
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
          ) : (
            <span className="font-display font-bold text-xl text-white/10 uppercase rotate-[-15deg]">GymDrop</span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow justify-center">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-display uppercase tracking-widest text-[#dc2626]">
              {category}
            </span>
            <div className="flex items-center text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded-sm border border-white/5">
              {getIconForBadge(badge)}
              <span className="font-display uppercase tracking-wider">{badge}</span>
            </div>
          </div>
          
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white mb-1 leading-tight">
            {name}
          </h3>
          
          <p className="text-sm text-white/50 mb-3 line-clamp-1 font-sans">
            {description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#dc2626] text-[#dc2626]" />
              <span className="font-medium text-white/90">{rating}</span>
              <span className="text-white/40">({reviews})</span>
            </div>
            <span className="text-sm font-bold text-white">{price}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#111] rounded overflow-hidden flex flex-col transition-all duration-300 hover:border-l-[#dc2626] border-l-2 border-l-transparent border border-white/5 hover:shadow-[-20px_0_40px_rgba(220,38,38,0.08)]"
    >
      <div className="aspect-[4/3] bg-[#161616] relative overflow-hidden flex items-center justify-center border-b border-white/5">
        {rank && (
          <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-sm font-display border border-white/10">
            #{rank}
          </div>
        )}
        <div className="absolute top-3 right-3 z-10 flex items-center bg-black/80 backdrop-blur-sm text-white/80 text-[10px] font-bold px-2 py-1 rounded-sm font-display uppercase tracking-widest border border-white/10">
          {getIconForBadge(badge)}
          {badge}
        </div>
        
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <span className="font-display font-bold text-2xl text-white/10 uppercase rotate-[-15deg]">
            GymDrop
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] font-display uppercase tracking-widest text-[#dc2626] mb-2">
          {category}
        </span>
        
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-2 leading-tight">
          {name}
        </h3>
        
        <p className="text-sm text-white/60 mb-5 font-sans leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-5 bg-[#161616] p-2.5 rounded-sm border border-white/5">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
            <span className="font-medium text-white/90">{rating}</span>
            <span className="text-white/40">({reviews} reviews)</span>
          </div>
          <span className="font-bold text-white">{price}</span>
        </div>

        <div className="mt-auto">
          <a href="#" className="inline-flex items-center text-sm font-display uppercase tracking-widest text-[#dc2626] hover:text-white transition-colors">
            View Find <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}