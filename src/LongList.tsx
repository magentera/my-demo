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
        Math.random() * 300 + 1
      )}`
    );
  }

  componentDidMount() {
    Observable.timer(2000)
      .flatMap(() => Observable.fromPromise(this.getRandomTodoData()))
      .repeat()
      .subscribe(data => {
        Observable.fromPromise(data.json()).subscribe(result => {
          if (data.status == 200)
            return this.setState(() => ({
              messages: [String(JSON.stringify(result))]
            }));

          return this.setState(() => ({
            messages: ["Todo data not found"]
          }));
        });
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
