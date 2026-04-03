import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue Trend",
    text: "Revenue is up 12% compared to last week. SaaS subscriptions drove the majority of growth.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: AlertTriangle,
    title: "Spending Alert",
    text: "Marketing spend exceeded budget by $1,240. Consider reallocating from underperforming channels.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Lightbulb,
    title: "Optimization Tip",
    text: "Switching cloud provider for staging could save ~$380/mo based on current usage patterns.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const AISummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-card-foreground">AI Daily Summary</h2>
          <p className="text-xs text-muted-foreground">Generated today at 9:00 AM</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        Today's business performance is <span className="text-success font-semibold">strong</span>. Total revenue reached $14,280 with 23 new transactions. 
        Operating expenses are within budget at 78% utilization. Three items require your attention below.
      </p>

      <div className="space-y-3">
        {insights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            className="flex gap-3 rounded-lg bg-muted/50 p-3"
          >
            <div className={`rounded-md ${item.bg} p-1.5 h-fit`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AISummary;
