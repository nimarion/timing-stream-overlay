import { parseNationAndClub } from "@/utils/country";
import Flag from "react-world-flags";

export default function CountryFlag({
  nation,
  height = 30,
}: {
  nation: string;
  height?: number;
}) {
  const { country, codeFallback } = parseNationAndClub(nation);

  if (!country) {
    if (codeFallback) {
      return (
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-mono font-bold rounded bg-theme-panel text-theme-secondary border border-theme-border">
          {codeFallback}
        </span>
      );
    }
    return null;
  }

  const isoCountryCode = country["iso-3166-1-alpha2"];
  return (
    <Flag
      code={isoCountryCode}
      style={{ height: `${height}px`, width: "auto" }}
      className="object-contain rounded-[2px] shrink-0"
      fallback={
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-mono font-bold rounded bg-theme-panel text-theme-secondary">
          {codeFallback || isoCountryCode}
        </span>
      }
    />
  );
}
