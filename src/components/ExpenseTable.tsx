import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const expenses = [
  { id: 1, name: "AWS Cloud Services", category: "Infrastructure", amount: -2840, date: "Today", status: "Completed" },
  { id: 2, name: "Client Payment - Acme Corp", category: "Revenue", amount: 8500, date: "Today", status: "Received" },
  { id: 3, name: "Google Workspace", category: "Software", amount: -432, date: "Today", status: "Completed" },
  { id: 4, name: "Freelancer - UI Design", category: "Contractor", amount: -1200, date: "Yesterday", status: "Pending" },
  { id: 5, name: "Client Payment - TechStart", category: "Revenue", amount: 5780, date: "Yesterday", status: "Received" },
  { id: 6, name: "Office Supplies", category: "Operations", amount: -189, date: "Yesterday", status: "Completed" },
];

const ExpenseTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl bg-card shadow-[var(--shadow-card)] overflow-hidden"
    >
      <div className="p-6 pb-4">
        <h2 className="text-lg font-display font-bold text-card-foreground">Recent Transactions</h2>
        <p className="text-xs text-muted-foreground mt-1">Your latest business expenses and income</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Transaction</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">Category</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <motion.tr
                key={expense.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-1.5 ${expense.amount > 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      {expense.amount > 0 ? (
                        <ArrowDownRight className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-destructive" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{expense.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 hidden sm:table-cell">
                  <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">{expense.category}</span>
                </td>
                <td className="px-6 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{expense.date}</td>
                <td className="px-6 py-3.5 hidden md:table-cell">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    expense.status === "Received" ? "bg-success/10 text-success" :
                    expense.status === "Pending" ? "bg-warning/10 text-warning" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {expense.status}
                  </span>
                </td>
                <td className={`px-6 py-3.5 text-sm font-semibold text-right ${
                  expense.amount > 0 ? "text-success" : "text-card-foreground"
                }`}>
                  {expense.amount > 0 ? "+" : ""}${Math.abs(expense.amount).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ExpenseTable;
