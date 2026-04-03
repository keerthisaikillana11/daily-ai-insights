import React, { createContext, useContext, useState, useEffect } from "react";

export interface LogEntry {
  id: string;
  text: string;
  type: "sale" | "expense" | "note";
  amount?: number;
  product?: string;
  timestamp: string;
}

export interface DaySummary {
  date: string;
  entries: LogEntry[];
  totalSales: number;
  totalExpenses: number;
  profit: number;
}

interface DataContextType {
  todayEntries: LogEntry[];
  addEntry: (entry: Omit<LogEntry, "id" | "timestamp">) => void;
  history: DaySummary[];
  endDay: () => DaySummary;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const todayKey = () => new Date().toISOString().split("T")[0];

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayEntries, setTodayEntries] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem(`bizpulse-entries-${todayKey()}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<DaySummary[]>(() => {
    const saved = localStorage.getItem("bizpulse-history");
    return saved ? JSON.parse(saved) : generateSampleHistory();
  });

  useEffect(() => {
    localStorage.setItem(`bizpulse-entries-${todayKey()}`, JSON.stringify(todayEntries));
  }, [todayEntries]);

  useEffect(() => {
    localStorage.setItem("bizpulse-history", JSON.stringify(history));
  }, [history]);

  const addEntry = (entry: Omit<LogEntry, "id" | "timestamp">) => {
    const newEntry: LogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setTodayEntries((prev) => [...prev, newEntry]);
  };

  const endDay = (): DaySummary => {
    const totalSales = todayEntries
      .filter((e) => e.type === "sale")
      .reduce((sum, e) => sum + (e.amount || 0), 0);
    const totalExpenses = todayEntries
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + (e.amount || 0), 0);
    const summary: DaySummary = {
      date: todayKey(),
      entries: todayEntries,
      totalSales,
      totalExpenses,
      profit: totalSales - totalExpenses,
    };
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.date !== todayKey());
      return [...filtered, summary];
    });
    return summary;
  };

  return (
    <DataContext.Provider value={{ todayEntries, addEntry, history, endDay }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

function generateSampleHistory(): DaySummary[] {
  const days: DaySummary[] = [];
  for (let i = 6; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const sales = Math.floor(Math.random() * 8000) + 3000;
    const expenses = Math.floor(Math.random() * 4000) + 1000;
    days.push({
      date: date.toISOString().split("T")[0],
      entries: [
        { id: `s-${i}`, text: `Product sales`, type: "sale", amount: sales, product: ["Rice", "Wheat", "Oil", "Sugar", "Dal", "Spices"][i % 6], timestamp: date.toISOString() },
        { id: `e-${i}`, text: `Operating expenses`, type: "expense", amount: expenses, timestamp: date.toISOString() },
      ],
      totalSales: sales,
      totalExpenses: expenses,
      profit: sales - expenses,
    });
  }
  return days;
}
