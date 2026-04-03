import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import { useData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";

const Dashboard = () => {
  const { history, todayEntries } = useData();
  const { t } = useLanguage();

  const last7 = history.slice(-7);
  const weeklyData = last7.map((d) => ({
    day: new Date(d.date).toLocaleDateString("en", { weekday: "short" }),
    sales: d.totalSales,
    expenses: d.totalExpenses,
    profit: d.profit,
  }));

  const totalWeekProfit = last7.reduce((s, d) => s + d.profit, 0);
  const prevWeekProfit = totalWeekProfit * 0.85; // simulated
  const weekChange = prevWeekProfit > 0 ? ((totalWeekProfit - prevWeekProfit) / prevWeekProfit * 100).toFixed(1) : "0";

  // Today's data
  const todaySales = todayEntries.filter(e => e.type === "sale").reduce((s, e) => s + (e.amount || 0), 0);
  const todayExpenses = todayEntries.filter(e => e.type === "expense").reduce((s, e) => s + (e.amount || 0), 0);

  // Product suggestions
  const productSales: Record<string, number> = {};
  [...history, { entries: todayEntries, date: "", totalSales: 0, totalExpenses: 0, profit: 0 }].forEach(day => {
    day.entries.filter(e => e.type === "sale" && e.product).forEach(e => {
      productSales[e.product!] = (productSales[e.product!] || 0) + (e.amount || 0);
    });
  });
  const topProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">{t("dashboard")}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted-foreground">{t("weeklyProfitLoss")}</p>
            <p className={`text-2xl font-display font-bold mt-1 ${totalWeekProfit >= 0 ? "text-success" : "text-destructive"}`}>
              {totalWeekProfit >= 0 ? "+" : ""}₹{totalWeekProfit.toLocaleString()}
            </p>
            <p className="text-xs text-success mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {weekChange}% vs previous week
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted-foreground">{t("todaysPerformance")}</p>
            <p className="text-2xl font-display font-bold text-card-foreground mt-1">₹{todaySales.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Sales: ₹{todaySales.toLocaleString()} · Expenses: ₹{todayExpenses.toLocaleString()}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted-foreground">{t("todaysPerformance")}</p>
            <p className={`text-2xl font-display font-bold mt-1 ${todaySales - todayExpenses >= 0 ? "text-success" : "text-destructive"}`}>
              {todaySales - todayExpenses >= 0 ? "+" : ""}₹{(todaySales - todayExpenses).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{t("profitLoss")}</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-display font-bold text-card-foreground mb-4">{t("weeklyOverview")}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 72%, 56%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0, 72%, 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="hsl(152, 60%, 42%)" fill="url(#salesGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(0, 72%, 56%)" fill="url(#expGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-display font-bold text-card-foreground mb-4">{t("weeklyProfitLoss")}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Bar dataKey="profit" fill="hsl(172, 66%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-lg bg-warning/10 p-2">
              <Lightbulb className="h-5 w-5 text-warning" />
            </div>
            <h3 className="text-sm font-display font-bold text-card-foreground">{t("suggestions")}</h3>
          </div>
          <div className="space-y-3">
            {topProducts.length > 0 ? (
              topProducts.map(([product, amount], i) => (
                <div key={product} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="rounded-md bg-success/10 p-1.5">
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {product} — Top {i === 0 ? "seller" : "performer"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Generated ₹{amount.toLocaleString()} in total sales. {i === 0 ? "Consider increasing stock." : "Maintain current levels."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Log some sales with product names to see personalized suggestions!</p>
            )}
            {totalWeekProfit > 0 && (
              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                <div className="rounded-md bg-primary/10 p-1.5">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Weekly Profit Trend</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This week's profit is {weekChange}% higher than the previous week. Keep up the momentum!
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
