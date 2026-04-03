import { useState } from "react";
import { ClipboardList } from "lucide-react";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import DailyLog from "@/components/DailyLog";
import DaySummaryModal from "@/components/DaySummaryModal";
import { useData, DaySummary } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";

const Home = () => {
  const { endDay } = useData();
  const { t } = useLanguage();
  const [summary, setSummary] = useState<DaySummary | null>(null);

  const handleEndDay = () => {
    const s = endDay();
    setSummary(s);
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

      {summary && <DaySummaryModal summary={summary} onClose={() => setSummary(null)} />}
    </div>
  );
};

export default Home;
