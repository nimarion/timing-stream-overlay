import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Result, Startlist, AthleteProfile, WebSocketMessageSchema } from "@/types";
import { isDemo } from "@/utils";
import { useDemoResults, useDemoStartlist, useDemoUpcomingStartlists, useDemoLowerThird } from "./useDemoData";

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

export function useLiveLowerThird() {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
  const [athlete, setAthlete] = useState<AthleteProfile | null>(null);

  useEffect(() => {
    if (!lastJsonMessage) return;

    const parsed = WebSocketMessageSchema.safeParse(lastJsonMessage);
    if (!parsed.success) {
      console.warn("Invalid WebSocket message:", parsed.error);
      return;
    }

    const message = parsed.data;
    if (message.type === "lowerThird") {
      setAthlete(message.athlete);
    }
  }, [lastJsonMessage]);

  useDemoLowerThird(demoMode, setAthlete);

  return { athlete, isConnected, demoMode };
}

export function useLiveResults(maxDemoResults?: number) {
  const { lastJsonMessage, isConnected, demoMode } = useTimingWebSocket();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    
    const parsed = WebSocketMessageSchema.safeParse(lastJsonMessage);
    if (!parsed.success) {
      console.warn("Invalid WebSocket message:", parsed.error);
      return;
    }
    
    const message = parsed.data;
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

    const parsed = WebSocketMessageSchema.safeParse(lastJsonMessage);
    if (!parsed.success) {
      console.warn("Invalid WebSocket message:", parsed.error);
      return;
    }

    const message = parsed.data;
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
    
    const parsed = WebSocketMessageSchema.safeParse(lastJsonMessage);
    if (!parsed.success) {
      console.warn("Invalid WebSocket message:", parsed.error);
      return;
    }

    const message = parsed.data;
    if (message.type === "startlists") {
      setStartlists(message.startlists);
    }
  }, [lastJsonMessage]);

  useDemoUpcomingStartlists(demoMode, setStartlists);

  return { startlists, isConnected, demoMode };
}
