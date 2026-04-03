import { DollarSign, TrendingUp, Receipt, PiggyBank } from "lucide-react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import AISummary from "@/components/AISummary";
import SpendingChart from "@/components/SpendingChart";
import ExpenseTable from "@/components/ExpenseTable";

const stats = [
  { title: "Today's Revenue", value: "$14,280", change: "+12.5% from yesterday", changeType: "positive" as const, icon: DollarSign },
  { title: "Total Expenses", value: "$4,661", change: "-3.2% from yesterday", changeType: "positive" as const, icon: Receipt },
  { title: "Net Profit", value: "$9,619", change: "+18.7% from yesterday", changeType: "positive" as const, icon: TrendingUp },
  { title: "Monthly Savings", value: "$23,840", change: "On track for goal", changeType: "neutral" as const, icon: PiggyBank },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} delay={i * 0.08} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AISummary />
          <SpendingChart />
        </div>

        <div className="mb-8">
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
