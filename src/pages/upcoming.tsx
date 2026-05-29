import UpcomingTable from "@/components/UpcomingTable";
import { Startlist } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [startlists, setStartlists] = useState<Startlist[]>([]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as any;
    const type = message.type;
    if (type === "startlists") {
      setStartlists(message.startlists);
    }
  }, [lastJsonMessage]);

  const isDemo = searchParams.get("demo") === "true" || process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (isDemo) {
      setStartlists([
        {
          title: "Men's 100m Round 1",
          distance: 100,
          startTime: "10:00",
          date: "2026-05-29",
          members: []
        },
        {
          title: "Women's 200m Heats",
          distance: 200,
          startTime: "11:30",
          date: "2026-05-29",
          members: []
        },
        {
          title: "Men's 400m Final",
          distance: 400,
          startTime: "15:00",
          date: "2026-05-29",
          members: []
        }
      ]);
    }
  }, [isDemo]);

  if (readyState === ReadyState.OPEN || isDemo) {
    return (
      <UpcomingTable startlists={startlists} />
    );
  }
  return null;
}
