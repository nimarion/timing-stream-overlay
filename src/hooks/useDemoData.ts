import { useEffect, useRef } from "react";
import { Result, Startlist, AthleteProfile } from "@/types";
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomNation,
  getRandomSubtitle,
} from "@/utils/mock";

export function useDemoTiming(
  isDemo: boolean,
  setTime: React.Dispatch<React.SetStateAction<string | null>>,
  setWind: React.Dispatch<React.SetStateAction<number | null>>
) {
  useEffect(() => {
    if (!isDemo) return;

    setWind(null);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const totalSeconds = (Date.now() - startTime) / 1000;

      if (totalSeconds >= 10) {
        setWind((prev) => (prev === null ? 1.5 : prev));
      }

      if (totalSeconds < 60) {
        setTime(totalSeconds.toFixed(2));
      } else {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const secondsStr = seconds < 10 ? `0${seconds.toFixed(2)}` : seconds.toFixed(2);
        if (minutes < 60) {
          setTime(`${minutes}:${secondsStr}`);
        } else {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          const minStr = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
          setTime(`${hours}:${minStr}:${secondsStr}`);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isDemo, setTime, setWind]);
}

export function useDemoResults(
  isDemo: boolean,
  setResults: React.Dispatch<React.SetStateAction<Result[]>>,
  maxResults: number = 12,
  setTitle?: React.Dispatch<React.SetStateAction<string | null>>,
  setWind?: React.Dispatch<React.SetStateAction<number | null>>
) {
  const countRef = useRef(0);

  useEffect(() => {
    if (isDemo) {
      setTitle?.("Men's 100m Final");
      setWind?.(1.2);

      const interval = setInterval(() => {
        countRef.current += 1;

        setResults((prevResults) => {
          const rankNum = prevResults.length + 1;
          const prevTime =
            prevResults.length > 0 ? parseFloat(prevResults[prevResults.length - 1].time) : 9.79;
          const nextTime = (prevTime + 0.04 + Math.random() * 0.09).toFixed(2);
          const reaction = Number((0.108 + Math.random() * 0.095).toFixed(3));

          return [
            ...prevResults,
            {
              bib: (100 + rankNum).toString(),
              firstname: getRandomFirstName(),
              lastname: getRandomLastName(),
              nation: getRandomNation(),
              rank: rankNum.toString(),
              result: nextTime,
              time: nextTime,
              reactionTime: reaction,
            },
          ];
        });

        if (countRef.current >= maxResults) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        countRef.current = 0;
      };
    }
  }, [isDemo, setResults, maxResults, setTitle, setWind]);
}

export function useDemoLowerThird(
  isDemo: boolean,
  setAthlete: React.Dispatch<React.SetStateAction<AthleteProfile | null>>
) {
  useEffect(() => {
    if (isDemo) {
      let showing = true;
      const toggle = () => {
        if (showing) {
          setAthlete({
            firstname: getRandomFirstName(),
            lastname: getRandomLastName(),
            nation: getRandomNation(),
            subtitle: getRandomSubtitle(),
          });
        } else {
          setAthlete(null);
        }
        showing = !showing;
      };

      toggle();
      const interval = setInterval(toggle, 5000);
      return () => clearInterval(interval);
    }
  }, [isDemo, setAthlete]);
}

export function useDemoStartlist(
  isDemo: boolean,
  setStartlist: React.Dispatch<React.SetStateAction<Startlist | undefined>>
) {
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
        })),
      });
    }
  }, [isDemo, setStartlist]);
}

export function useDemoUpcomingStartlists(
  isDemo: boolean,
  setStartlists: React.Dispatch<React.SetStateAction<Startlist[]>>
) {
  useEffect(() => {
    if (isDemo) {
      setStartlists([
        {
          title: "Men's 100m Round 1",
          distance: 100,
          startTime: "10:00",
          date: "2026-05-29",
          members: [],
        },
        {
          title: "Women's 200m Heats",
          distance: 200,
          startTime: "11:30",
          date: "2026-05-29",
          members: [],
        },
        {
          title: "Men's 400m Final",
          distance: 400,
          startTime: "15:00",
          date: "2026-05-29",
          members: [],
        },
      ]);
    }
  }, [isDemo, setStartlists]);
}
