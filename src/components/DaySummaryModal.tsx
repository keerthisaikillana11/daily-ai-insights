import { useState } from "react";
import { motion } from "framer-motion";
import { X, TrendingUp, TrendingDown, Sparkles, Loader2, Volume2, VolumeX } from "lucide-react";
import { DaySummary } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import ReactMarkdown from "react-markdown";

interface Props {
  summary: DaySummary;
  aiSummary: string | null;
  aiLoading: boolean;
  onClose: () => void;
}

const DaySummaryModal = ({ summary, aiSummary, aiLoading, onClose }: Props) => {
  const { t } = useLanguage();
  const isProfit = summary.profit >= 0;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    if (!aiSummary) return;
    const plainText = aiSummary.replace(/[#*_~`>\-]/g, "").replace(/\n+/g, " ");
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-[var(--shadow-card-hover)] p-6 w-[90%] max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-display font-bold text-card-foreground">{t("daySummary")}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center rounded-xl bg-success/10 p-4">
            <span className="text-sm font-medium text-card-foreground">{t("totalSales")}</span>
            <span className="text-lg font-bold text-success">₹{summary.totalSales.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center rounded-xl bg-destructive/10 p-4">
            <span className="text-sm font-medium text-card-foreground">{t("totalExpenses")}</span>
            <span className="text-lg font-bold text-destructive">₹{summary.totalExpenses.toLocaleString()}</span>
          </div>
          <div className={`flex justify-between items-center rounded-xl p-4 ${isProfit ? "bg-success/10" : "bg-destructive/10"}`}>
            <div className="flex items-center gap-2">
              {isProfit ? <TrendingUp className="h-5 w-5 text-success" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
              <span className="text-sm font-medium text-card-foreground">{t("profitLoss")}</span>
            </div>
            <span className={`text-xl font-bold ${isProfit ? "text-success" : "text-destructive"}`}>
              {isProfit ? "+" : ""}₹{summary.profit.toLocaleString()}
            </span>
          </div>

          {/* AI Summary Section */}
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-display font-bold text-primary">{t("aiInsight")}</span>
              </div>
              {aiSummary && (
                <button
                  onClick={toggleSpeech}
                  className="rounded-lg p-1.5 hover:bg-primary/10 transition-colors"
                  title={isSpeaking ? "Stop" : "Listen"}
                >
                  {isSpeaking ? (
                    <VolumeX className="h-4 w-4 text-primary animate-pulse" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-primary" />
                  )}
                </button>
              )}
            </div>
            {aiLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{t("generatingSummary")}</span>
              </div>
            ) : aiSummary ? (
              <div className="text-sm text-card-foreground prose prose-sm max-w-none">
                <ReactMarkdown>{aiSummary}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Unable to generate AI summary.</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            {summary.entries.length} entries · {summary.date}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full h-10 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          {t("close")}
        </button>
      </motion.div>
    </div>
  );
};

export default DaySummaryModal;
