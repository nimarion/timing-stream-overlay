import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage, Result, Startlist } from "@/types";
import { isDemo } from "@/utils";
import { useDemoResults, useDemoStartlist, useDemoUpcomingStartlists } from "./useDemoData";

export function useTimingWebSocket() {
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const websocketUrl = searchParams.get("ws") || "ws://localhost:8080";
  const { lastJsonMessage, readyState } = useWebSocket(websocketUrl, {
    shouldReconnect: () => true,
  });
  const demoMode = isDemo();
  const isConnected = readyState === ReadyState.OPEN;

  return { lastJsonMessage, isConnected, demoMode };
}

export function useLiveResults(maxDemoResults?: number) {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
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

  useDemoResults(demoMode, setResults, maxDemoResults);

  return { results, isConnected, demoMode };
}

export function useLiveStartlist() {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
  const [startlist, setStartlist] = useState<Startlist>();

  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as WebSocketMessage;
    if (message.type === "startlist") {
      setStartlist(message);
    }
  }, [lastJsonMessage]);

  useDemoStartlist(demoMode, setStartlist);

  return { startlist, isConnected, demoMode };
}

export function useLiveUpcoming() {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
  const [startlists, setStartlists] = useState<Startlist[]>([]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    const message = lastJsonMessage as WebSocketMessage;
    if (message.type === "startlists") {
      setStartlists(message.startlists);
    }
  }, [lastJsonMessage]);

  useDemoUpcomingStartlists(demoMode, setStartlists);

  return { startlists, isConnected, demoMode };
}
