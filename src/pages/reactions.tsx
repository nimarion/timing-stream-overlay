import ReactionsTable from "@/components/ReactionsTable";
import { Result } from "@/types";
import { useDemoResults } from "@/hooks/useDemoData";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

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
      const results = message.results;
      setResults(results);
    } else if (type === "raceStarted") {
      setResults([]);
    }
  }, [lastJsonMessage]);

  const isDemo = searchParams.get("demo") === "true" || process.env.NODE_ENV !== "production";
  
  useDemoResults(isDemo, setResults, 8);

  if (readyState === ReadyState.OPEN || isDemo) {
    return <ReactionsTable results={results} />;
  }
  return null;
}
