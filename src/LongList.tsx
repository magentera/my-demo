import React from "react";
import { Observable } from "rxjs";

interface ContentState {
  messages: string[];
}

class LongList extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [] };
  }

  getRandomTodoData(): Promise<Response> {
    return fetch(
      `https://jsonplaceholder.typicode.com/todos/${Math.floor(
        Math.random() * 200 + 1
      )}`
    );
  }

  componentDidMount() {
    Observable.timer(2000)
      .flatMap(() => Observable.fromPromise(this.getRandomTodoData()))
      .repeat()
      .retry()
      .subscribe(data => {
        Observable.fromPromise(data.json()).subscribe(result =>
          this.setState(() => ({
            messages: [String(JSON.stringify(result))]
          }))
        );
      });
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>repeat()</code>
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
