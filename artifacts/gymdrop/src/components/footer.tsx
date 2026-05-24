import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-2xl tracking-wider uppercase text-foreground">
              Gym<span className="text-primary">Drop</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
            Raw, powerful, and focused. The elite destination for serious lifters and athletes.
          </p>
        </div>
        
        <div className="flex gap-8 font-display uppercase tracking-widest text-sm font-semibold">
          <a href="#trending" className="text-muted-foreground hover:text-primary transition-colors">Gear</a>
          <a href="#gadgets" className="text-muted-foreground hover:text-primary transition-colors">Gadgets</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GymDrop. All rights reserved.
      </div>
    </footer>
  );
}
