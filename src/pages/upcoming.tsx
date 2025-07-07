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

  if (readyState === ReadyState.OPEN) {
    return (
      <UpcomingTable startlists={startlists} />
    );
  }
  return null;
}
