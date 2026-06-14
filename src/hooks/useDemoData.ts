import { useEffect, useRef } from "react";
import { Result, Startlist } from "@/types";
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomNation,
} from "@/utils";

// Extracted from useDemoResults
export function useDemoResults(isDemo: boolean, setResults: React.Dispatch<React.SetStateAction<Result[]>>, maxResults: number = 12) {
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

        if (countRef.current >= maxResults) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        countRef.current = 0; // Reset ref on unmount or isDemo change
      };
    }
  }, [isDemo, setResults, maxResults]);
}

// Extracted from startlist.tsx
export function useDemoStartlist(isDemo: boolean, setStartlist: React.Dispatch<React.SetStateAction<Startlist | undefined>>) {
  useEffect(() => {
    if (isDemo) {
      setStartlist({
        title: "Men's 100m Final",
        distance: 100,
        startTime: "18:00",
        date: "2026-05-29",
        members: Array.from({ length: 8 }).map((_, i) => ({
          bib: (100 + i).toString(),
          firstname: getRandomFirstName(),
          lastname: getRandomLastName(),
          nation: getRandomNation(),
          lane: (i + 1).toString(),
        }))
      });
    }
  }, [isDemo, setStartlist]);
}

// Extracted from upcoming.tsx
export function useDemoUpcomingStartlists(isDemo: boolean, setStartlists: React.Dispatch<React.SetStateAction<Startlist[]>>) {
  useEffect(() => {
    if (isDemo) {
      setStartlists([
        {
          title: "Men's 100m Round 1",
          distance: 100,
          startTime: "10:00",
          date: "2026-05-29",
          members: []
        },
        {
          title: "Women's 200m Heats",
          distance: 200,
          startTime: "11:30",
          date: "2026-05-29",
          members: []
        },
        {
          title: "Men's 400m Final",
          distance: 400,
          startTime: "15:00",
          date: "2026-05-29",
          members: []
        }
      ]);
    }
  }, [isDemo, setStartlists]);
}
