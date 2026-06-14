import UpcomingTable from "@/components/UpcomingTable";
import { Startlist } from "@/types";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDemoUpcomingStartlists } from "@/hooks/useDemoData";

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

  useDemoUpcomingStartlists(isDemo, setStartlists);

  if (readyState === ReadyState.OPEN || isDemo) {
    return (
      <UpcomingTable startlists={startlists.slice(0, 5)} />
    );
  }
  return null;
}
