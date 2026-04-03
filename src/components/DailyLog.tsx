import { motion } from "framer-motion";
import { ShoppingCart, Receipt, FileText } from "lucide-react";
import { useData, LogEntry } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = {
  sale: ShoppingCart,
  expense: Receipt,
  note: FileText,
};

const colorMap = {
  sale: "text-success bg-success/10",
  expense: "text-destructive bg-destructive/10",
  note: "text-accent bg-accent/10",
};

const DailyLog = () => {
  const { todayEntries } = useData();
  const { t } = useLanguage();

  if (todayEntries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">{t("noEntries")}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-4">
      <h2 className="text-lg font-display font-bold text-foreground mb-4">{t("todaysLog")}</h2>
      <div className="space-y-2 max-w-3xl mx-auto">
        {todayEntries.map((entry, i) => {
          const Icon = iconMap[entry.type];
          const colors = colorMap[entry.type];
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-card)]"
            >
              <div className={`rounded-lg p-2 ${colors}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{entry.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {entry.product && ` · ${entry.product}`}
                </p>
              </div>
              {entry.amount != null && (
                <span className={`text-sm font-semibold ${entry.type === "sale" ? "text-success" : entry.type === "expense" ? "text-destructive" : "text-foreground"}`}>
                  {entry.type === "expense" ? "-" : "+"}₹{entry.amount.toLocaleString()}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyLog;
