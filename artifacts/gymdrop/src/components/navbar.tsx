import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.02]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl tracking-widest uppercase text-white">
            Gym<span className="text-[#dc2626]">Drop</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-display uppercase tracking-[0.15em] text-xs font-medium text-white/60">
          <a href="#finds" className="hover:text-white transition-colors">Finds</a>
          <a href="#gadgets" className="hover:text-white transition-colors">Gadgets</a>
          <a href="#gear" className="hover:text-white transition-colors">Gear</a>
          <a href="#rankings" className="hover:text-white transition-colors">Rankings</a>
        </div>
      </div>
    </nav>
  );
}
