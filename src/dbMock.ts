import { Observable } from "rxjs/Rx";
import * as sampleData from "./sampleData";

const longDbQuery = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.longQuery);
  }, 3040);
});

const shortDbQuery = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.shortQuery);
  }, 250);
});

const userData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.userData);
  }, 2000);
});

const weather = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.weatherQuery);
  }, 5000);
});
// Pretend the above is database connection code

//Oberservables
export const observableUserData = Observable.fromPromise(userData);
export const observableWeatherReport = Observable.fromPromise(weather);
export const observableSuperShortQuery = Observable.fromPromise(shortDbQuery);
export const observableSuperLongQuery = Observable.fromPromise(longDbQuery);
