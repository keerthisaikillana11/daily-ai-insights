import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  lang?: string;
}

const AudioPlayer = ({ text, lang = "en-US" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const cleanText = text.replace(/[#*_~`>\-]/g, "").replace(/\n+/g, " ").trim();

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      const startTime = Date.now();
      // Estimate duration: ~150 words per minute
      const words = cleanText.split(/\s+/).length;
      const estimatedMs = (words / 150) * 60 * 1000;

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / estimatedMs) * 100, 95);
        setProgress(pct);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, cleanText]);

  const play = () => {
    if (!cleanText) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setHasFinished(true);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setHasFinished(false);
    setProgress(0);
  };

  const toggle = () => {
    if (isPlaying) {
      stop();
      setProgress(0);
    } else {
      play();
    }
  };

  const replay = () => {
    setHasFinished(false);
    setProgress(0);
    play();
  };

  return (
    <div className="flex items-center gap-3 mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
      <button
        onClick={hasFinished ? replay : toggle}
        className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
      >
        {hasFinished ? (
          <RotateCcw className="h-4 w-4" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </button>

      <div className="flex-1 flex flex-col gap-1">
        <div className="h-1.5 rounded-full bg-primary/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground">
          {hasFinished ? "Finished" : isPlaying ? "Playing..." : "Listen to summary"}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
