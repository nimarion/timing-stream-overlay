import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StartlistTable from "@/components/StartlistTable";
import { Startlist } from "@/types";
import { getRandomFirstName, getRandomLastName, getRandomNation } from "@/utilts";

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [startlist, setStartlist] = useState<Startlist>();

  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as any;
    const type = message.type;
    if (type === "startlist") {
      setStartlist(message);
    }
  }, [lastJsonMessage]);

  const isDemo = searchParams.get("demo") === "true" || process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (isDemo) {
      setStartlist({
        title: "Men's 100m Final",
        distance: 100,
        startTime: "18:00",
        date: "2026-05-29",
        members: Array.from({ length: 8 }).map((_, i) => ({
          bib: (100 + i).toString(),
          firstname: getRandomFirstName(),
          lastname: getRandomLastName(),
          nation: getRandomNation(),
          lane: (i + 1).toString(),
        }))
      });
    }
  }, [isDemo]);

  if (readyState === ReadyState.OPEN || isDemo) {
    if (!startlist) {
      return null;
    }
    return <StartlistTable startlist={startlist} />;
  }
  return null;
}
