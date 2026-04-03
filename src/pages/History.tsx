import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";

const History = () => {
  const { history } = useData();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">{t("history")}</h1>

        <div className="space-y-3">
          {[...history].reverse().map((day, i) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {new Date(day.date).toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric" })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {day.entries.length} entries · Sales: ₹{day.totalSales.toLocaleString()} · Expenses: ₹{day.totalExpenses.toLocaleString()}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${day.profit >= 0 ? "text-success" : "text-destructive"}`}>
                  {day.profit >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-bold">{day.profit >= 0 ? "+" : ""}₹{day.profit.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
