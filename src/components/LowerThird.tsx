import { AthleteProfile } from "@/types";
import CountryFlag from "./CountryFlag";
import { formatLastname } from "@/utils";
import { parseNationAndClub } from "@/utils/country";
import { useEffect, useState, useRef } from "react";

export default function LowerThird({ athlete }: { athlete: AthleteProfile | null }) {
  const [displayedAthlete, setDisplayedAthlete] = useState<AthleteProfile | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (athlete) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayedAthlete(athlete);
      setIsAnimatingOut(false);
    } else if (!athlete && displayedAthlete && !isAnimatingOut) {
      setIsAnimatingOut(true);
      timerRef.current = setTimeout(() => {
        setDisplayedAthlete(null);
        setIsAnimatingOut(false);
      }, 500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [athlete, displayedAthlete, isAnimatingOut]);

  if (!displayedAthlete) return null;

  const { country, club, codeFallback } = parseNationAndClub(displayedAthlete.nation);
  const hasVisualFlagOrBadge = Boolean(country || codeFallback);
  const subtitle = displayedAthlete.subtitle || club;

  return (
    <div className="flex w-full h-full justify-start items-end pb-8 pl-8 antialiased">
      <div
        className={`flex overflow-hidden rounded-md shadow-2xl border-l-8 bg-theme-panel border-theme-accent ${
          isAnimatingOut ? "slideOutLeft" : "slideInLeft"
        }`}
      >
        {hasVisualFlagOrBadge && (
          <div className="flex items-center justify-center p-4 bg-black/20 border-r border-theme-border">
            <div className="w-24 flex items-center justify-center overflow-hidden rounded shadow-sm">
              <CountryFlag nation={displayedAthlete.nation} height={64} />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center px-6 py-4 min-w-[300px]">
          <div className="text-4xl font-bold uppercase tracking-wide flex items-center gap-3 text-theme-primary font-display">
            <span className="opacity-90">{displayedAthlete.firstname}</span>
            <span>{formatLastname(displayedAthlete.lastname)}</span>
          </div>

          {subtitle && (
            <div className="text-xl font-medium mt-1 uppercase tracking-wider text-theme-accent font-mono">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
