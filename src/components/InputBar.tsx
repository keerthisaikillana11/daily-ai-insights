import { useState, useRef } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { toast } from "@/hooks/use-toast";

const InputBar = () => {
  const { t } = useLanguage();
  const { addEntry } = useData();
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const parseEntry = (input: string) => {
    const lower = input.toLowerCase();
    let type: "sale" | "expense" | "note" = "note";
    let amount: number | undefined;
    let product: string | undefined;

    if (lower.includes("sold") || lower.includes("sale") || lower.includes("revenue")) {
      type = "sale";
    } else if (lower.includes("spent") || lower.includes("expense") || lower.includes("paid") || lower.includes("bought")) {
      type = "expense";
    }

    const amountMatch = input.match(/[\$₹]?\s*(\d+[\d,]*\.?\d*)/);
    if (amountMatch) amount = parseFloat(amountMatch[1].replace(",", ""));

    const productPatterns = [/sold\s+(.+?)\s+(?:for|at)/i, /bought\s+(.+?)\s+(?:for|at)/i];
    for (const p of productPatterns) {
      const m = input.match(p);
      if (m) { product = m[1].trim(); break; }
    }

    return { text: input, type, amount, product };
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    const entry = parseEntry(text);
    addEntry(entry);
    setText("");
    toast({
      title: entry.type === "sale" ? "💰 Sale logged" : entry.type === "expense" ? "💸 Expense logged" : "📝 Note added",
      description: `${entry.text}${entry.amount ? ` — ₹${entry.amount}` : ""}`,
    });
  };

  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Speech not supported", description: "Your browser doesn't support speech recognition.", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setText((prev) => (prev ? prev + " " + transcript : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border p-3 z-40">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={t("enterTransaction")}
          className="flex-1 h-11 rounded-xl bg-muted border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          onClick={toggleVoice}
          className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors ${
            isListening
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InputBar;
