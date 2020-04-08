import { Data } from "./../Utilities/Data";

export class DataController {
  async getAll() {
    return {
      "Total Confirmed Cases": await Data.totalCases,
      "Total Deaths": await Data.deathCases,
      "Total Recovered": await Data.recoveredCases,
      "Last Updated": await Data.lastUpdated,
      "Country Data": await Data.cleanedData,
    };
  }

  async getCountry(country: string) {
    const data = await Data.cleanedData;
    const requiredData = data.find(
      (value) => value["Country"].toLowerCase() === country
    );

    return {
      "Last Updated": await Data.lastUpdated,
      "Required Data": requiredData,
    };
  }

  async getTotal() {
    return {
      "Total Confirmed Cases": await Data.totalCases,
      "Total Deaths": await Data.deathCases,
      "Total Recovered": await Data.recoveredCases,
      "Last Updated": await Data.lastUpdated,
    };
  }
}
