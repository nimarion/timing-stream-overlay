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