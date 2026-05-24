import { Link } from "wouter";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-2xl tracking-wider uppercase text-foreground">
            Gym<span className="text-primary">Drop</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-display uppercase tracking-widest text-sm font-semibold">
          <a href="#trending" className="text-muted-foreground hover:text-primary transition-colors">Trending</a>
          <a href="#gadgets" className="text-muted-foreground hover:text-primary transition-colors">Gadgets</a>
          <a href="#gear" className="text-muted-foreground hover:text-primary transition-colors">Gear</a>
        </div>

        <Button className="font-display uppercase tracking-wider font-bold" asChild>
          <a href="#trending">Start Shopping</a>
        </Button>
      </div>
    </nav>
  );
}
