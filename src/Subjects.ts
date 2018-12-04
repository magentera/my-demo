import * as Rx from "rxjs/Rx";
import { fruits } from "./sampleData";
import { Subject } from "rxjs/Rx";
import * as sampleData from "./sampleData";

export const FruitSubject = new Subject();
export const interestingSubject = new Subject();

const interestingEvent = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(sampleData.longQuery);
  }, 3040);
});

setInterval(() => {
  interestingSubject.next();
}, 2000);
