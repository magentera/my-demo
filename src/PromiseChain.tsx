import React from "react";
import * as dbContext from "./dbMock";
import { Subscription, Observable } from "rxjs";

interface ContentState {
  long: string;
  short: string;
  user: string;
  weather: string;
  subscriptions: Subscription[];
}
class PromiseChain extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      long: "",
      short: "",
      user: "",
      weather: "",
      subscriptions: []
    };

    this.subscribeToObservables = this.subscribeToObservables.bind(this);
    this.unsubscribeFromObservables = this.unsubscribeFromObservables.bind(
      this
    );
  }

  subscribeToObservables() {
    this.setState(state => ({
      subscriptions: [
        ...state.subscriptions,
        dbContext.observableSuperLongQuery.subscribe(result =>
          this.setState({ long: String(result) })
        )
      ]
    }));
    this.setState(state => ({
      subscriptions: [
        ...state.subscriptions,
        dbContext.observableSuperShortQuery.subscribe(result =>
          this.setState({ short: String(result) })
        )
      ]
    }));
    this.setState(state => ({
      subscriptions: [
        ...state.subscriptions,
        dbContext.observableUserData.subscribe(result =>
          this.setState({ user: String(result) })
        )
      ]
    }));
    this.setState(state => ({
      subscriptions: [
        ...state.subscriptions,
        dbContext.observableWeatherReport.subscribe(result =>
          this.setState({ weather: String(result) })
        )
      ]
    }));
  }

  unsubscribeFromObservables() {
    this.state.subscriptions.map(sub => sub.unsubscribe());
    this.setState(state => ({
      long: "",
      short: "",
      user: "",
      weather: "",
      subscriptions: []
    }));
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>fromPromise()</code>
          </h1>
          <button onClick={this.subscribeToObservables}>Subscribe</button>
          <button onClick={this.unsubscribeFromObservables}>Unsubscribe</button>
          <p>long: {this.state.long}</p>
          <p>short: {this.state.short}</p>
          <p>userData: {this.state.user}</p>
          <p>weather: {this.state.weather}</p>
        </header>
      </div>
    );
  }
}

export default PromiseChain;
