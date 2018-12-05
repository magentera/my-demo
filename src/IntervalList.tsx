import React from "react";

import { interval, BehaviorSubject } from "rxjs";

const counter = interval(1000);

interface ContentState {
  observerA: number;
  observerB: string;
}
class IntervalList extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { observerA: 0, observerB: "" };
  }

  componentDidMount() {
    counter.subscribe(val => subject.next(val));

    var subject = new BehaviorSubject(0);

    subject.subscribe({
      next: val => this.setState({ observerA: val })
    });

    subject.subscribe({
      next: val => this.setState({ observerB: "We changed it " + val })
    });
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>Subject()</code>
          </h1>
          <p>observerA: {this.state.observerA}</p>
          <p>observerB: {this.state.observerB}</p>
        </header>
      </div>
    );
  }
}

export default IntervalList;
