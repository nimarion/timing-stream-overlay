import ReactionsTable from "@/components/ReactionsTable";
import { Result, WebSocketMessage } from "@/types";
import { useDemoResults } from "@/hooks/useDemoData";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { isDemo } from "@/utils";

export default function ReactionsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as WebSocketMessage;
    if (message.type === "results") {
      setResults(message.results);
    } else if (message.type === "raceStarted") {
      setResults([]);
    }
  }, [lastJsonMessage]);

  const demoMode = isDemo();
  
  useDemoResults(demoMode, setResults, 8);

  if (readyState === ReadyState.OPEN || demoMode) {
    return <ReactionsTable results={results} />;
  }
  return null;
}
