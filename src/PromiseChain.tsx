import React from "react";
import * as dbContext from "./dbMock";
import { Subscription, interval, BehaviorSubject, Observable } from "rxjs";

const counter = interval(1000);
var subject = new BehaviorSubject<number>(0);

interface ContentState {
  observerA: number;
  subscription: Subscription;
}
class PromiseChain extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      observerA: 0,
      subscription: new Subscription()
    };

    this.subscribeToObservables = this.subscribeToObservables.bind(this);
  }

  componentDidMount() {
    counter.subscribe(val => subject.next(val));

    const subscribeButton = document.querySelector(".subscribe");

    if (subscribeButton) {
      Observable.fromEvent(subscribeButton, "click").subscribe(() =>
        this.subscribeToObservables()
      );
    }

    const unsubscribeButton = document.querySelector(".unsubscribe");

    if (unsubscribeButton) {
      Observable.fromEvent(unsubscribeButton, "click").subscribe(() =>
        this.state.subscription.unsubscribe()
      );
    }
  }

  subscribeToObservables() {
    this.setState(() => ({
      subscription: subject.subscribe({
        next: val => this.setState({ observerA: val })
      })
    }));
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>BehaviourSubject()</code>
          </h1>
          <span>
            <button className="subscribe">Subscribe</button>
            <button className="unsubscribe">Unsubscribe</button>
            <p>observerA: {this.state.observerA}</p>
          </span>
        </header>
      </div>
    );
  }
}

export default PromiseChain;
