import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">{t("settings")}</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-display font-bold text-card-foreground">{t("languagePreferences")}</h2>
          </div>

          <div className="space-y-3">
            {(["english", "telugu"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`w-full flex items-center justify-between rounded-xl p-4 border transition-colors ${
                  language === lang
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang === "english" ? "🇬🇧" : "🇮🇳"}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-card-foreground capitalize">{lang}</p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "english" ? "English" : "తెలుగు"}
                    </p>
                  </div>
                </div>
                {language === lang && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
