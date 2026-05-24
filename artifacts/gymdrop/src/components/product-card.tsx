import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: string;
  badge: string;
  rating: string;
  image?: string;
  delay?: number;
}

export function ProductCard({ name, price, badge, rating, image, delay = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative bg-card border border-border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
    >
      <div className="absolute top-3 right-3 z-10">
        <Badge variant="default" className="font-display uppercase tracking-wider bg-primary text-primary-foreground">
          {badge}
        </Badge>
      </div>

      <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
            <span className="font-display font-bold text-4xl text-muted-foreground/30 uppercase text-center px-4 rotate-[-15deg]">
              GymDrop
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm font-medium text-foreground">{rating}</span>
        </div>
        
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-1 line-clamp-2">
          {name}
        </h3>
        
        <p className="text-lg font-bold text-primary mb-4 mt-auto">
          {price}
        </p>

        <Button className="w-full font-display uppercase tracking-wider font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Shop Now
        </Button>
      </div>
    </motion.div>
  );
}
