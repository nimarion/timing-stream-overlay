import { AthleteProfile } from "@/types";
import CountryFlag from "./CountryFlag";
import { formatLastname } from "@/utils";
import { useEffect, useState, useRef } from "react";

export default function LowerThird({ athlete }: { athlete: AthleteProfile | null }) {
  const [displayedAthlete, setDisplayedAthlete] = useState<AthleteProfile | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (athlete) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayedAthlete(athlete);
      setIsAnimatingOut(false);
    } else if (!athlete && displayedAthlete && !isAnimatingOut) {
      // Trigger out animation before clearing
      setIsAnimatingOut(true);
      timerRef.current = setTimeout(() => {
        setDisplayedAthlete(null);
        setIsAnimatingOut(false);
      }, 500); // Matches slideOutLeft duration
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [athlete, displayedAthlete, isAnimatingOut]); // Must include all used state in the dependency array to evaluate the else-if correctly when athlete turns null

  // We should ONLY return null if there is no athlete AND we are done animating out.
  // Otherwise, we must render the container so the out-animation can physically play.
  if (!displayedAthlete && !isAnimatingOut) return null;

  // Safe fallback if displayedAthlete hasn't mounted yet but we somehow bypass the check
  if (!displayedAthlete) return null;

  return (
    <div className="flex w-full h-full justify-start items-end pb-8 pl-8 antialiased">
      <div 
        className={`flex overflow-hidden rounded-md shadow-2xl border-l-8 ${isAnimatingOut ? "slideOutLeft" : "slideInLeft"}`}
        style={{
          backgroundColor: "var(--theme-panel-bg)",
          borderColor: "var(--theme-accent)",
        }}
      >
        {/* Flag Block */}
        <div 
          className="flex items-center justify-center p-4 bg-black/20"
          style={{ borderRight: "1px solid var(--theme-row-border)" }}
        >
          <div className="w-24 flex items-center justify-center overflow-hidden rounded shadow-sm">
             <CountryFlag nation={displayedAthlete.nation} height={64} />
          </div>
        </div>

        {/* Text Block */}
        <div className="flex flex-col justify-center px-6 py-4 min-w-[300px]">
          <div 
            className="text-4xl font-bold uppercase tracking-wide flex items-center gap-3"
            style={{ color: "var(--theme-text-primary)", fontFamily: "var(--theme-font-display)" }}
          >
            <span className="opacity-90">{displayedAthlete.firstname}</span>
            <span>{formatLastname(displayedAthlete.lastname)}</span>
          </div>
          
          {displayedAthlete.subtitle && (
            <div 
              className="text-xl font-medium mt-1 uppercase tracking-wider"
              style={{ color: "var(--theme-accent)", fontFamily: "var(--theme-font-mono)" }}
            >
              {displayedAthlete.subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
