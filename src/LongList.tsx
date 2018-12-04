import React from "react";
import { interval } from "rxjs";

const constantFeed = interval(1000);

interface ContentState {
  messages: number[];
}

class LongList extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    constantFeed
      .map(n => {
        if (n === 5) throw "error";
        return n + 1;
      })
      .retryWhen(errors => {
        this.setState({ messages: [] });
        return errors.delay(5000);
      })
      .subscribe(val =>
        this.setState(state => ({
          messages: [...state.messages, Number(val)]
        }))
      );
  }

  //idea pipe the observable data into a subject and create different subjects for event types.

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>retry()</code>
          </h1>
          <ul>
            {this.state.messages.map(message => (
              <li>{message}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default LongList;
