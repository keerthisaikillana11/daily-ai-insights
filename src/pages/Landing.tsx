import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BarChart3, Mic, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

const features = [
  { icon: Mic, title: "Voice & Text Input", desc: "Log sales and expenses by typing or speaking" },
  { icon: BarChart3, title: "Smart Dashboard", desc: "Weekly charts, profit tracking & AI suggestions" },
  { icon: FileText, title: "Day Summaries", desc: "End-of-day reports with complete breakdown" },
];

const Landing = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Business Tracker</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
            {t("appName")}
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            {t("landing_tagline")}
          </p>

          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {t("getStarted")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)] text-center"
            >
              <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-display font-bold text-card-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
