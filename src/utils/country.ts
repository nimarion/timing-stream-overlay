import countryMapping from "./country-mapping.json";

export function findCountryByIocCode(iocCode: string) {
  return countryMapping.find(
    (country) => country.ioc.toUpperCase() === iocCode.toUpperCase()
  ) || null;
}

export function findCountryByName(name: string) {
  return countryMapping.find(
    (country) => country.country.toUpperCase() === name.toUpperCase()
  ) || null;
}

export function findCountry(nation: string) {
  nation = nation.trim();
  
  if (nation.includes("|")) {
    const parts = nation.split("|");
    const iocPart = parts[0].trim();
    const namePart = parts[1].trim();

    const countryByIoc = findCountryByIocCode(iocPart);
    if (countryByIoc) return countryByIoc;

    const countryByName = findCountryByName(namePart);
    if (countryByName) return countryByName;
  }

  const countryByIoc = findCountryByIocCode(nation);
  if (countryByIoc) return countryByIoc;

  return findCountryByName(nation);
}