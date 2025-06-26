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
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    if (!lastJsonMessage) return;
    const type = lastJsonMessage.type;
    if (type === "wind") {
      const wind = Number(lastJsonMessage.wind);
      if (isNaN(wind)) return;
      setWind(Number(wind.toFixed(1)));
    }
    if (type === "runningTime") {
      const time = lastJsonMessage.time;
      if (time === "0.0") {
        setWind(null);
      }
      setTime(time);
    }
  }, [lastJsonMessage]);
  if (readyState === ReadyState.OPEN) {
    return (
      <div className="flex flex-row gap-4 justify-end mt-auto">
        <div className="flex flex-row gap-4 h-20 w-auto">
          {wind && (
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
            <div className="bg-gray-100 flex w-auto	px-4 rounded-md text-right text-5xl justify-center items-center">
              <p className="time text-right w-full font-bold">{time}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
