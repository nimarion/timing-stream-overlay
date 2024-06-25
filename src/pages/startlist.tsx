import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StartlistTable from "@/components/StartlistTable";
import { Startlist } from "@/types";

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [startlist, setStartlist] = useState<Startlist>();

  useEffect(() => {
    if (!lastJsonMessage) return;
    const type = lastJsonMessage.type;
    if (type === "startlist") {
      setStartlist(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  if (readyState === ReadyState.OPEN) {
    if (!startlist) {
      return null;
    }
    return <StartlistTable startlist={startlist} />;
  }
  return null;
}
