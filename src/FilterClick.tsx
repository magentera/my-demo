import React from "react";
import * as Rx from "rxjs/Rx";
import { fruits } from "./sampleData";
import { FruitSubject } from "./Subjects";

interface ContentState {
  messages: string[];
  clickState: string;
}

class FilterClick extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [], clickState: "" };

    this.handler = this.handler.bind(this);
    this.pushToSubject = this.pushToSubject.bind(this);
  }

  componentDidMount() {
    FruitSubject
      //.filter(x => x === "Apple")
      .subscribe(mes =>
        this.setState(state => ({
          messages: [...state.messages, String(mes)]
        }))
      );

    const doubleButton = document.querySelector(".doubleclick");

    if (doubleButton) {
      const observedButtonEvent = Rx.Observable.fromEvent(
        doubleButton,
        "click"
      );
      observedButtonEvent
        .bufferWhen(() => observedButtonEvent.delay(350))
        .filter(events => events.length >= 2)
        .subscribe(() => {
          this.setState({
            clickState: "You double clicked"
          });
          return this.handler();
        });
    }
    const slowDownButton = document.querySelector(".slowdownbuddy");

    if (slowDownButton) {
      Rx.Observable.fromEvent(slowDownButton, "click")
        .throttleTime(1000)
        .scan(count => count + 1, 0)
        .subscribe(() => {
          this.setState({
            clickState: "You slow clicked"
          });
          return this.handler();
        });
    }
  }

  handler(): void {
    this.pushToSubject(FruitSubject, fruits[Math.floor(Math.random() * 10)]);
  }

  pushToSubject = function(subject: Rx.Subject<{}>, fruit: string) {
    subject.next(fruit);
  };

  render() {
    return (
      <div className="item">
        <div className="App-tile">
          <h1 className="App-title">
            <code>clickHandlers()</code>
          </h1>
          <button className="doubleclick">Only doubles</button>
          <button className="slowdownbuddy">Slow down buddy</button>
          <div>{this.state.clickState}</div>

          {this.state.messages.map(message => (
            <div>{message}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default FilterClick;
