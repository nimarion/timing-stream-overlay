import WindIcon from "@/components/WindIcon";
import { useLiveTiming } from "@/hooks/useTiming";
import { cn } from "@/utils";

function formatWind(wind: number): string {
  const rounded = Number(wind.toFixed(1));
  if (rounded === 0) return "+0.0";
  return rounded > 0 ? `+${rounded.toFixed(1)}` : rounded.toFixed(1);
}

export default function TimingPage() {
  const { time, wind, isConnected, demoMode } = useLiveTiming();

  if (isConnected || demoMode) {
    return (
      <div className="flex flex-row gap-4 justify-end mt-auto overflow-hidden">
        <div className="flex flex-row gap-4 h-20 w-auto overflow-hidden">
          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden flex flex-row items-center gap-4 rounded-md font-bold text-5xl h-full text-theme-primary font-mono tabular-nums",
              wind !== null
                ? wind > 2.0
                  ? "bg-theme-accent shadow-theme-glow p-4 max-w-[300px] opacity-100 scale-100"
                  : "bg-green-500/95 p-4 max-w-[300px] opacity-100 scale-100"
                : "max-w-0 p-0 opacity-0 scale-90 pointer-events-none"
            )}
          >
            <div className="flex flex-row items-center gap-4 whitespace-nowrap">
              <WindIcon className="w-8 h-8 mt-2" />
              <p>{wind !== null ? formatWind(wind) : "+0.0"}</p>
            </div>
          </div>
          {time && (
            <div
              className="bg-theme-panel text-theme-primary flex px-4 transition-[width] duration-300 ease-in-out rounded-md text-right text-5xl justify-center items-center box-content overflow-hidden"
              style={{ width: `${Math.max(3, time.length + 0.5)}ch` }}
            >
              <p className="font-mono text-theme-primary tracking-[1px] text-right w-full font-bold tabular-nums">
                {time}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
