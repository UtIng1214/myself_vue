import axios from 'axios';

const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
console.log(apiKey);
const baseUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';

const weatherApi = axios.create({
  baseURL: baseUrl,
  params: {
    Authorization: apiKey,
  },
});

export const getWeatherData = (dataset, additionalParams = {}) => {
  return weatherApi.get(`/${dataset}`, {
    params: additionalParams,
  });
};