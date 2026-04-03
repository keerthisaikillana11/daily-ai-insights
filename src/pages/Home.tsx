import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import DailyLog from "@/components/DailyLog";
import DaySummaryModal from "@/components/DaySummaryModal";
import { useData, DaySummary } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const { endDay } = useData();
  const { t } = useLanguage();
  const [summary, setSummary] = useState<DaySummary | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleEndDay = async () => {
    const s = endDay();
    setSummary(s);
    setAiSummary(null);
    setAiLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("day-summary", {
        body: {
          entries: s.entries,
          totalSales: s.totalSales,
          totalExpenses: s.totalExpenses,
          profit: s.profit,
        },
      });

      if (error) throw error;
      setAiSummary(data.summary);
    } catch (err: any) {
      console.error("AI summary error:", err);
      toast.error("Could not generate AI summary");
      setAiSummary(null);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-4 pb-24 max-w-7xl mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8 mb-4 flex justify-end">
          <button
            onClick={handleEndDay}
            className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <ClipboardList className="h-4 w-4" />
            {t("endDay")}
          </button>
        </div>

        <DailyLog />
      </div>

      <InputBar />

      {summary && (
        <DaySummaryModal
          summary={summary}
          aiSummary={aiSummary}
          aiLoading={aiLoading}
          onClose={() => setSummary(null)}
        />
      )}
    </div>
  );
};

export default Home;
