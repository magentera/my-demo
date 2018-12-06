import React from "react";
import { Observable } from "rxjs";
import { TodoItem } from "./types";
import { TodoSubject } from "./Subjects";

interface ContentState {
  messages: TodoItem[];
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
    Observable.timer(1000)
      .flatMap(() => Observable.fromPromise(this.getRandomTodoData()))
      .repeat()
      .subscribe(data => {
        Observable.fromPromise(data.json()).subscribe((result: TodoItem) => {
          if (data.status == 200) TodoSubject.next(result);
        });
      });

    TodoSubject.subscribe((val: TodoItem) => {
      if (this.state.messages.length > 4)
        this.setState(state => ({
          messages: [...state.messages.slice(1, 5)]
        }));

      this.setState(state => ({
        messages: [...state.messages, val]
      }));
    });
  }

  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>Todo Subject</code>
          </h1>

          {this.state.messages.map(message => (
            <div>
              <p>
                {message.title}
                <br />
                {message.completed ? "Complete" : "Not completed"}
              </p>
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default LongList;
