import { Observable } from "rxjs/Rx";
import * as sampleData from "./sampleData";

const getLongDbQuery = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.longQuery);
  }, 3040);
});

const getShortDbQuery = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.shortQuery);
  }, 250);
});

const getUserData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.userData);
  }, 2000);
});

const getWeather = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.weatherQuery);
  }, 5000);
});
// Pretend the above is database connection code

//Oberservables
export const observableUserData = Observable.fromPromise(getUserData);
export const observableWeatherReport = Observable.fromPromise(getWeather);
export const observableSuperShortQuery = Observable.fromPromise(
  getShortDbQuery
);
export const observableSuperLongQuery = Observable.fromPromise(getLongDbQuery);
