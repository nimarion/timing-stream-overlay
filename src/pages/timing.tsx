import WindIcon from "@/components/WindIcon";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function TimingPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [wind, setWind] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>("0.0");
  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as any;
    const type = message.type;
    if (type === "wind") {
      const wind = Number(message.wind);
      if (isNaN(wind)) return;
      setWind(Number(wind.toFixed(1)));
    }
    if (type === "runningTime") {
      const time = message.time;
      if (time === "0.0") {
        setWind(null);
      }
      setTime(time);
    }
  }, [lastJsonMessage]);

  const isDemo = searchParams.get("demo") === "true" || process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (isDemo) {
      setWind(1.5);
      const startTime = Date.now();
      const interval = setInterval(() => {
        const totalSeconds = (Date.now() - startTime) / 1000;
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
  }, [isDemo]);

  if (readyState === ReadyState.OPEN || isDemo) {
    return (
      <div className="flex flex-row gap-4 justify-end mt-auto">
        <div className="flex flex-row gap-4 h-20 w-auto">
          {wind !== null && (
            <div
              className={`${
                wind >= 2.5 ? "bg-red-500" : "bg-green-500"
              }  w-auto p-4 rounded-md font-bold text-5xl justify-center items-center flex flex-row gap-4`}
            >
              <WindIcon className="w-8 h-8 mt-2" />
              <p>{wind}</p>
            </div>
          )}
          {time && (
            <div
              className="bg-gray-100 flex px-4 transition-[width] duration-300 ease-in-out rounded-md text-right text-5xl justify-center items-center box-content"
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
