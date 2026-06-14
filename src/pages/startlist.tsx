import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StartlistTable from "@/components/StartlistTable";
import { Startlist } from "@/types";
import { useDemoStartlist } from "@/hooks/useDemoData";

import { isDemo } from "@/utils";

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

  const demoMode = isDemo();

  useDemoStartlist(demoMode, setStartlist);

  if (readyState === ReadyState.OPEN || demoMode) {
    if (!startlist) {
      return null;
    }
    return <StartlistTable startlist={startlist} />;
  }
  return null;
}
