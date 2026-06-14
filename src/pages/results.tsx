import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ResultsTable from "@/components/ResultsTable";
import { Result } from "@/types";
import { useDemoResults } from "@/hooks/useDemoData";

import { isDemo } from "@/utils";

export default function ResultsPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as any;
    const type = message.type;
    if (type === "results") {
      setResults(message.results);
    } else if (type === "raceStarted") {
      setResults([]);
    }
  }, [lastJsonMessage]);

  const demoMode = isDemo();
  
  useDemoResults(demoMode, setResults);

  if (readyState === ReadyState.OPEN || demoMode) {
    return <ResultsTable results={results} />;
  }
  return null;
}
