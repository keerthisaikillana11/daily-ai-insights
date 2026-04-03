import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold text-foreground">{t("appName")}</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/home"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/home"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">{t("home")}</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                profileOpen
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t("profile")}</span>
            </button>
            {profileOpen && <ProfileDropdown onClose={() => setProfileOpen(false)} />}
          </div>

          <Link
            to="/settings"
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Settings className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
