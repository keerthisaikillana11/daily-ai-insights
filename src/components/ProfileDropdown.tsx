import { Link } from "react-router-dom";
import { User, Clock, BarChart3, Edit } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
}

const ProfileDropdown = ({ onClose }: Props) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const items = [
    { icon: User, label: "John Doe", to: "", isName: true },
    { icon: Clock, label: t("history"), to: "/history" },
    { icon: BarChart3, label: t("dashboard"), to: "/dashboard" },
    { icon: Edit, label: t("editProfile"), to: "/edit-profile" },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-card border border-border shadow-[var(--shadow-card-hover)] py-2 animate-fade-up"
    >
      {items.map((item) =>
        item.isName ? (
          <div key="name" className="px-4 py-2.5 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">JD</span>
              </div>
              <span className="text-sm font-semibold text-card-foreground">{item.label}</span>
            </div>
          </div>
        ) : (
          <Link
            key={item.label}
            to={item.to}
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      )}
    </div>
  );
};

export default ProfileDropdown;
