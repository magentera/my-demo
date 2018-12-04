import React from "react";

import { interval } from "rxjs";

const counter = interval(1000);

interface ContentState {
  count: number;
}
class DoubleClick extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    counter.subscribe(val => this.setState({ count: val }));
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>interval()</code>
          </h1>
          <p>Count: {this.state.count}</p>
        </header>
      </div>
    );
  }
}

export default DoubleClick;
