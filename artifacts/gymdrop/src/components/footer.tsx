import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.02] py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-widest uppercase text-white">
              Gym<span className="text-[#dc2626]">Drop</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm font-sans">
            Fitness gear. Discovered weekly.
          </p>
        </div>
        
        <div className="flex gap-6 font-display uppercase tracking-[0.1em] text-xs text-white/50">
          <a href="/#finds" className="hover:text-white transition-colors">Finds</a>
          <a href="/#gadgets" className="hover:text-white transition-colors">Gadgets</a>
          <a href="/#gear" className="hover:text-white transition-colors">Gear</a>
          <a href="/#rankings" className="hover:text-white transition-colors">Rankings</a>
          <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
        </div>

        <div className="text-xs text-white/30 font-sans">
          © {new Date().getFullYear()} GymDrop. Affiliate links may earn us a commission.
        </div>
      </div>
    </footer>
  );
}
