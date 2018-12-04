import React from "react";
import * as Rx from "rxjs/Rx";
import { fruits } from "./sampleData";

interface ContentState {
  messages: string[];
  clickState: string;
}

class FilterClick extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [], clickState: "" };

    this.handler = this.handler.bind(this);
    this.pushToArray = this.pushToArray.bind(this);
  }

  FruitSubject = new Rx.Subject();

  componentDidMount() {
    this.FruitSubject.filter(x => x === "Apple").subscribe(mes =>
      this.setState(state => ({
        messages: state.messages.concat(String(mes))
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
        .throttleTime(1000) // only click once per second.
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
    this.pushToArray(this.FruitSubject, fruits[Math.floor(Math.random() * 10)]);
  }

  pushToArray = function(subject: Rx.Subject<{}>, fruit: string) {
    subject.next(fruit);
  };

  render() {
    return (
      <div className="item">
        <div className="App-tile">
          <h1 className="App-title">
            <code>clickHandlers()</code>
          </h1>
          <div />
          <button className="doubleclick">Only doubles</button>
          <button className="slowdownbuddy">Slow down buddy</button>

          <div>{this.state.clickState}</div>
          <ul>
            {this.state.messages.map(message => (
              <li>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterClick;
