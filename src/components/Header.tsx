import { motion } from "framer-motion";
import { Sparkles, Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary p-2 animate-pulse-glow">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">AI Vyapari</h1>
          <p className="text-xs text-muted-foreground">Daily Business Summary & Expenses</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg bg-card p-2.5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="rounded-lg bg-card p-2.5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <div className="ml-2 h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">JD</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
