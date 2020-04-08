import csvtojson from "csvtojson";
import axios from "axios";

export class Data {
  private readonly covid19DataConfirmedUrl: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

  private readonly covid19DataDeathUrl: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

  private readonly covid19DataRecoveredUrl: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

  public static cleanedData: any[];
  public static totalCases: number;
  public static deathCases: number;
  public static recoveredCases: number;
  public static lastUpdated: Date;

  async getData(dataUrl: string) {
    const csvString = (await axios.get(dataUrl)).data;
    return await csvtojson().fromString(csvString);
  }

  async cleanData() {
    const confirmedCsvData = await this.getData(this.covid19DataConfirmedUrl);
    const deathCsvData = await this.getData(this.covid19DataDeathUrl);
    const recoveredCsvData = await this.getData(this.covid19DataRecoveredUrl);

    const cleanData = Array();

    confirmedCsvData.forEach((data) => {
      const countryProvince = data["Country/Region"];

      const confirmedLogs = Array();
      const deathLogs = Array();
      const recoveryLogs = Array();

      const confirmedCases = Number(data[Object.keys(data).reverse()[0]]);

      const deathData = deathCsvData.find(
        (death) =>
          death["Country/Region"] === data["Country/Region"] &&
          death["Province/State"] === data["Province/State"]
      );
      const deathsConfirmed =
        deathData === undefined
          ? 0
          : Number(deathData[Object.keys(deathData).reverse()[0]]);

      const recoverData = recoveredCsvData.find(
        (recover) =>
          recover["Country/Region"] === data["Country/Region"] &&
          recover["Province/State"] === data["Province/State"]
      );
      const recoverConfirmed =
        recoverData === undefined
          ? 0
          : Number(recoverData[Object.keys(recoverData).reverse()[0]]);

      const dataPresent = cleanData.findIndex(
        (cleanedData) => cleanedData["Country"] === data["Country/Region"]
      );

      if (dataPresent > -1) {
        cleanData[dataPresent]["Confirmed Cases"] += Number(confirmedCases);

        cleanData[dataPresent]["Confirmed Deaths"] += Number(deathsConfirmed);

        cleanData[dataPresent]["Confirmed Recoveries"] += Number(
          recoverConfirmed
        );

        cleanData[dataPresent]["Confirmed Cases Logs"].push(data);

        if (deathData !== undefined) {
          cleanData[dataPresent]["Death Cases Logs"].push(deathData);
        }

        if (recoverData !== undefined) {
          cleanData[dataPresent]["Recovered Cases Logs"].push(recoverData);
        }
      } else {
        confirmedLogs.push(data);

        if (deathData !== undefined) {
          deathLogs.push(deathData);
        }

        if (recoverData !== undefined) {
          recoveryLogs.push(recoverData);
        }

        cleanData.push({
          Country: countryProvince,
          "Confirmed Cases": Number(confirmedCases),
          "Confirmed Deaths": Number(deathsConfirmed),
          "Confirmed Recoveries": Number(recoverConfirmed),
          "Confirmed Cases Logs": confirmedLogs,
          "Death Cases Logs": deathLogs,
          "Recovered Cases Logs": recoveryLogs,
        });
      }
    });

    Data.cleanedData = cleanData;

    let confirmedSum = 0;
    let deathSum = 0;
    let recoveredSum = 0;

    confirmedCsvData.forEach((data) => {
      confirmedSum += Number(data[Object.keys(data).reverse()[0]]);
    });

    deathCsvData.forEach((data) => {
      deathSum += Number(data[Object.keys(data).reverse()[0]]);
    });

    recoveredCsvData.forEach((data) => {
      recoveredSum += Number(data[Object.keys(data).reverse()[0]]);
    });

    Data.totalCases = confirmedSum;
    Data.deathCases = deathSum;
    Data.recoveredCases = recoveredSum;
    Data.lastUpdated = new Date(Date.now());
  }
}
