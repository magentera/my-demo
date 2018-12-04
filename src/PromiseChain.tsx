import React from "react";
import * as dbContext from "./dbMock";

interface ContentState {
  long: string;
  short: string;
  user: string;
  weather: string;
}
class PromiseChain extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { long: "", short: "", user: "", weather: "" };
  }

  componentDidMount() {
    dbContext.observableSuperLongQuery.subscribe(result =>
      this.setState({ long: String(result) })
    );

    dbContext.observableSuperShortQuery.subscribe(result =>
      this.setState({ short: String(result) })
    );
    dbContext.observableUserData.subscribe(result =>
      this.setState({ user: String(result) })
    );

    dbContext.observableWeatherReport.subscribe(result =>
      this.setState({ weather: String(result) })
    );
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>fromPromise()</code>
          </h1>
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
