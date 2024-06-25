import countryMapping from "./country-mapping.json";

export function findCountryByIocCode(iocCode: string) {
    const country = countryMapping.find(
      (country) => country.ioc.toUpperCase() === iocCode.toUpperCase()
    );
    if (country) {
      return country;
    }
    return null;
  }

  export function findCountryByName(name: string) {
    const country = countryMapping.find(
      (country) => country.country.toUpperCase() === name.toUpperCase()
    );
    if (country) {
      return country;
    }
    return null;
  }

  export function findCountry(nation: string) {
    nation = nation.trim();
    if (nation.includes("|")) {
      const country = findCountryByIocCode(nation.split("|")[0].trim());
      if (country) {
        return country;
      }
      if(findCountryByName(nation.split("|")[1].trim())) {
        return findCountryByName(nation.split("|")[1].trim());
      }
    }
    if(findCountryByIocCode(nation)) {
      return findCountryByIocCode(nation);
    }
    const country = findCountryByName(nation);
    if (country) {
      return country;
    }
    return null;
  }