import { findCountry } from "@/country-utils";
import Flag from "react-world-flags";

export default function CountryFlag({
  nation,
  height = 30,
}: {
  nation: string;
  height?: number;
}) {
  const country = findCountry(nation);
  if(!country) {
    return null;
  }
  const isoCountryCode = country["iso-3166-1-alpha2"];
  return (
    <Flag
      height={height}
      width={height}
      code={isoCountryCode}
      fallback={<span>{isoCountryCode}</span>}
    />
  );
}
