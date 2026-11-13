import WindIcon from "@/components/WindIcon";
import { useTimingWebSocket } from "@/hooks/useTiming";
import { WebSocketMessageSchema } from "@/types";
import { useEffect, useState } from "react";

function formatWind(wind: number): string {
  const rounded = Number(wind.toFixed(1));
  if (rounded === 0) return "+0.0";
  return rounded > 0 ? `+${rounded.toFixed(1)}` : rounded.toFixed(1);
}

export default function TimingPage() {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
  const [wind, setWind] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>("0.0");

  useEffect(() => {
    if (!lastJsonMessage) return;

    const parsed = WebSocketMessageSchema.safeParse(lastJsonMessage);
    if (!parsed.success) {
      console.warn("Invalid WebSocket message:", parsed.error);
      return;
    }

    const message = parsed.data;
    if (message.type === "wind") {
      if (message.wind === null || Number.isNaN(message.wind)) {
        setWind(null);
      } else {
        setWind(Number(message.wind.toFixed(1)));
      }
    } else if (message.type === "runningTime") {
      const trimmedTime = message.time.trim();
      if (trimmedTime === "0.0" || trimmedTime === "0.00") {
        setWind(null);
      }
      setTime(trimmedTime);
    } else if (message.type === "raceStarted") {
      setWind(null);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (demoMode) {
      setWind(null);
      const startTime = Date.now();
      const interval = setInterval(() => {
        const totalSeconds = (Date.now() - startTime) / 1000;

        if (totalSeconds >= 10) {
          setWind((prev) => (prev === null ? 1.5 : prev));
        }

        if (totalSeconds < 60) {
          setTime(totalSeconds.toFixed(2));
        } else {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const secondsStr = seconds < 10 ? `0${seconds.toFixed(2)}` : seconds.toFixed(2);
          if (minutes < 60) {
            setTime(`${minutes}:${secondsStr}`);
          } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const minStr = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
            setTime(`${hours}:${minStr}:${secondsStr}`);
          }
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [demoMode]);

  if (isConnected || demoMode) {
    return (
      <div className="flex flex-row gap-4 justify-end mt-auto overflow-hidden">
        <div className="flex flex-row gap-4 h-20 w-auto overflow-hidden">
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-row items-center gap-4 rounded-md font-bold text-5xl h-full ${
              wind !== null
                ? `${wind > 2.0 ? "bg-red-500" : "bg-green-500"} p-4 max-w-[300px] opacity-100 scale-100`
                : "max-w-0 p-0 opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <div className="flex flex-row items-center gap-4 whitespace-nowrap">
              <WindIcon className="w-8 h-8 mt-2" />
              <p>{wind !== null ? formatWind(wind) : "+0.0"}</p>
            </div>
          </div>
          {time && (
            <div
              className="bg-gray-100 flex px-4 transition-[width] duration-300 ease-in-out rounded-md text-right text-5xl justify-center items-center box-content overflow-hidden"
              style={{ width: `${Math.max(3, time.length + 0.5)}ch` }}
            >
              <p className="time text-right w-full font-bold tabular-nums">{time}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
