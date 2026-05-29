import { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ResultsTable from "@/components/ResultsTable";
import { Result } from "@/types";
import { getRandomFirstName, getRandomLastName, getRandomNation } from "@/utilts";

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

  const isDemo = searchParams.get("demo") === "true" || process.env.NODE_ENV !== "production";
  const countRef = useRef(0);

  useEffect(() => {
    if (isDemo) {
      const interval = setInterval(() => {
        countRef.current += 1;

        setResults((prevResults) => [
          ...prevResults,
          {
            bib: (prevResults.length + 1).toString(),
            firstname: getRandomFirstName(),
            lastname: getRandomLastName(),
            nation: getRandomNation(),
            rank: (prevResults.length + 1).toString(),
            result: (Math.random() * 10).toFixed(2),
            time: (Math.random() * 10).toFixed(2),
            reactionTime: Math.random() * 0.2,
          },
        ]);

        if (countRef.current >= 12) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isDemo]);

  if (readyState === ReadyState.OPEN || isDemo) {
    return <ResultsTable results={results} />;
  }
  return null;
}
