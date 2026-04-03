import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "english" | "telugu";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  appName: { english: "AI Vyapari", telugu: "AI వ్యాపారి" },
  home: { english: "Home", telugu: "హోమ్" },
  profile: { english: "Profile", telugu: "ప్రొఫైల్" },
  settings: { english: "Settings", telugu: "సెట్టింగ్‌లు" },
  dashboard: { english: "Dashboard", telugu: "డాష్‌బోర్డ్" },
  history: { english: "History", telugu: "చరిత్ర" },
  editProfile: { english: "Edit Profile", telugu: "ప్రొఫైల్ మార్చు" },
  enterTransaction: { english: "Enter a transaction or note...", telugu: "లావాదేవీ లేదా నోట్ నమోదు చేయండి..." },
  endDay: { english: "End Day & Summarize", telugu: "రోజు ముగించు & సారాంశం" },
  todaysLog: { english: "Today's Log", telugu: "నేటి లాగ్" },
  noEntries: { english: "No entries yet. Start logging your transactions!", telugu: "ఇంకా ఎంట్రీలు లేవు. మీ లావాదేవీలను లాగ్ చేయండి!" },
  daySummary: { english: "Day Summary", telugu: "రోజు సారాంశం" },
  totalSales: { english: "Total Sales", telugu: "మొత్తం అమ్మకాలు" },
  totalExpenses: { english: "Total Expenses", telugu: "మొత్తం ఖర్చులు" },
  profitLoss: { english: "Profit / Loss", telugu: "లాభం / నష్టం" },
  weeklyOverview: { english: "Weekly Overview", telugu: "వారపు అవలోకనం" },
  todaysPerformance: { english: "Today's Performance", telugu: "నేటి పనితీరు" },
  suggestions: { english: "AI Suggestions", telugu: "AI సూచనలు" },
  weeklyProfitLoss: { english: "Weekly Profit/Loss", telugu: "వారపు లాభం/నష్టం" },
  languagePreferences: { english: "Language Preferences", telugu: "భాషా ప్రాధాన్యతలు" },
  landing_tagline: { english: "AI Daily Business Summary & Expense Tracker", telugu: "AI రోజువారీ వ్యాపార సారాంశం & ఖర్చుల ట్రాకర్" },
  getStarted: { english: "Get Started", telugu: "ప్రారంభించండి" },
  profit: { english: "Profit", telugu: "లాభం" },
  loss: { english: "Loss", telugu: "నష్టం" },
  sale: { english: "Sale", telugu: "అమ్మకం" },
  expense: { english: "Expense", telugu: "ఖర్చు" },
  close: { english: "Close", telugu: "మూసివేయి" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("bizpulse-language") as Language) || "english";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bizpulse-language", lang);
  };

  const t = (key: string) => translations[key]?.[language] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
