import countryMapping from "./country-mapping.json" with { type: "json" };

export type CountryEntry = (typeof countryMapping)[number];

function normalizeName(value: string): string {
  return value
    .normalize("NFKC")
    .toUpperCase()
    .replace(/ß/g, "SS")
    .replace(/Ä/g, "AE")
    .replace(/Ö/g, "OE")
    .replace(/Ü/g, "UE")
    .replace(/[-\s.'’(),]+/g, "");
}

const byIoc = new Map<string, CountryEntry>();
const byAlpha2 = new Map<string, CountryEntry>();
const byAlpha3 = new Map<string, CountryEntry>();
const byNormalizedName = new Map<string, CountryEntry>();

const deDisplayNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames !== "undefined"
    ? new Intl.DisplayNames(["de"], { type: "region" })
    : null;
const enDisplayNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames !== "undefined"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

for (const entry of countryMapping) {
  const alpha2 = entry["iso-3166-1-alpha2"].toUpperCase();
  const alpha3 = entry["iso-3166-1-alpha3"].toUpperCase();
  const ioc = entry.ioc.toUpperCase();

  if (alpha2) byAlpha2.set(alpha2, entry);
  if (alpha3) byAlpha3.set(alpha3, entry);
  if (ioc) byIoc.set(ioc, entry);
  if (entry.country) {
    byNormalizedName.set(normalizeName(entry.country), entry);
  }

  if (alpha2.length === 2) {
    try {
      const deName = deDisplayNames?.of(alpha2);
      if (deName) byNormalizedName.set(normalizeName(deName), entry);
      const enName = enDisplayNames?.of(alpha2);
      if (enName) byNormalizedName.set(normalizeName(enName), entry);
    } catch {
      // Ignore unsupported region codes
    }
  }
}

const EXTRA_ALIASES: Record<string, string> = {
  GROSSBRITANNIEN: "GB",
  GREATBRITAIN: "GB",
  ENGLAND: "GB",
  SCOTLAND: "GB",
  SCHOTTLAND: "GB",
  WALES: "GB",
  USA: "US",
  HOLLAND: "NL",
};

for (const [alias, alpha2] of Object.entries(EXTRA_ALIASES)) {
  const target = byAlpha2.get(alpha2);
  if (target && !byNormalizedName.has(alias)) {
    byNormalizedName.set(alias, target);
  }
}

export function findCountryByIocCode(iocCode: string): CountryEntry | null {
  const upper = iocCode.trim().toUpperCase();
  return byIoc.get(upper) || byAlpha3.get(upper) || byAlpha2.get(upper) || null;
}

export function findCountryByName(name: string): CountryEntry | null {
  const norm = normalizeName(name.trim());
  if (!norm) return null;
  return byNormalizedName.get(norm) || null;
}

function findCountrySingle(token: string): CountryEntry | null {
  const trimmed = token.trim();
  if (!trimmed) return null;
  return findCountryByIocCode(trimmed) || findCountryByName(trimmed);
}

export function findCountry(nation: string): CountryEntry | null {
  return parseNationAndClub(nation).country;
}

export function parseNationAndClub(nation: string): {
  country: CountryEntry | null;
  club: string | null;
  codeFallback: string | null;
} {
  const raw = nation.trim();
  if (!raw) {
    return { country: null, club: null, codeFallback: null };
  }

  if (raw.includes("|")) {
    const [firstPart, ...restParts] = raw.split("|");
    const left = firstPart.trim();
    const right = restParts.join("|").trim();

    const leftCountry = findCountrySingle(left);
    if (leftCountry) {
      return {
        country: leftCountry,
        club: right || null,
        codeFallback: left.toUpperCase(),
      };
    }

    const rightCountry = findCountrySingle(right);
    if (rightCountry) {
      return {
        country: rightCountry,
        club: left || null,
        codeFallback: right.toUpperCase(),
      };
    }

    if (/^[A-Za-z]{2,3}$/.test(left)) {
      return {
        country: null,
        club: right || null,
        codeFallback: left.toUpperCase(),
      };
    }

    return {
      country: null,
      club: right || left || null,
      codeFallback: null,
    };
  }

  const country = findCountrySingle(raw);
  if (country) {
    return {
      country,
      club: null,
      codeFallback: country.ioc || country["iso-3166-1-alpha2"],
    };
  }

  if (/^[A-Za-z]{2,3}$/.test(raw)) {
    return {
      country: null,
      club: null,
      codeFallback: raw.toUpperCase(),
    };
  }

  return {
    country: null,
    club: raw,
    codeFallback: null,
  };
}
