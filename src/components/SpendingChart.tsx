import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", revenue: 3200, expenses: 1800 },
  { day: "Tue", revenue: 4100, expenses: 2200 },
  { day: "Wed", revenue: 2800, expenses: 1600 },
  { day: "Thu", revenue: 5200, expenses: 2900 },
  { day: "Fri", revenue: 4800, expenses: 2100 },
  { day: "Sat", revenue: 3600, expenses: 1400 },
  { day: "Sun", revenue: 4280, expenses: 1900 },
];

const SpendingChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)]"
    >
      <h2 className="text-lg font-display font-bold text-card-foreground">Weekly Overview</h2>
      <p className="text-xs text-muted-foreground mt-1 mb-6">Revenue vs Expenses — last 7 days</p>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(262, 60%, 58%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(262, 60%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 16%, 90%)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px hsl(220, 20%, 10%, 0.08)",
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(172, 66%, 40%)" strokeWidth={2} fill="url(#revenueGradient)" />
            <Area type="monotone" dataKey="expenses" stroke="hsl(262, 60%, 58%)" strokeWidth={2} fill="url(#expenseGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">Expenses</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingChart;
