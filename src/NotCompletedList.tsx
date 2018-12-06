import React from "react";
import { TodoSubject } from "./Subjects";
import { TodoItem } from "./types";

interface ContentState {
  messages: TodoItem[];
}
class NotCompletedList extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [] };
  }
  componentDidMount() {
    TodoSubject.filter(val => val.completed === false).subscribe(
      (val: TodoItem) => {
        if (this.state.messages.length > 4)
          this.setState(state => ({
            messages: [...state.messages.slice(1, 5)]
          }));

        this.setState(state => ({
          messages: [...state.messages, val]
        }));
      }
    );
  }
  render() {
    return (
      <div className="item">
        <header className="App-tile">
          <h1 className="App-title">
            <code>Not completed</code>
          </h1>
          <div>
            {this.state.messages.map(item => (
              <div>
                <p>
                  {item.title}
                  <br />
                  {item.completed ? "Completed" : "Not completed"}
                </p>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default NotCompletedList;
