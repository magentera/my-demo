import React from "react";
import * as Rx from "rxjs/Rx";

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
    this.FruitSubject
      // .filter(x => x ==== "Apple")
      .subscribe(mes =>
        this.setState(state => ({
          messages: state.messages.concat(String(mes))
        }))
      );

    const button = document.querySelector(".clicker");
    if (button) {
      const obj = Rx.Observable.fromEvent(button, "click");
      obj
        //.throttleTime(1000) // only click once per second.
        .bufferWhen(() => obj.delay(350))
        .filter(events => events.length >= 2)
        .subscribe(() => {
          this.setState({
            clickState: "You double clicked"
          });
          return this.handler();
        });
    }
    const button2 = document.querySelector(".slowDownBuddy");
    if (button2) {
      Rx.Observable.fromEvent(button2, "click")
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
          <button className="clicker">Add</button>
          <button className="slowDownBuddy">slow Click</button>

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

const fruits = [
  "Apple",
  "Orange",
  "Strawberry",
  "Grapes",
  "Tomato",
  "Fejoa",
  "Passionfruit",
  "Dragonfruit",
  "Lychee",
  "Durian"
];
export default FilterClick;
