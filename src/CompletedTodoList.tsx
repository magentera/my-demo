import React from "react";
import { TodoSubject } from "./Subjects";
import { TodoItem } from "./types";

interface ContentState {
  messages: TodoItem[];
}
class CompletedList extends React.Component<{}, ContentState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [] };
  }
  componentDidMount() {
    TodoSubject.filter(item => item.completed === true).subscribe(
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
            <code>Completed</code>
          </h1>
          <div>
            {this.state.messages.map(item => (
              <div>
                <p>
                  {item.title}
                  <br />

                  {item.completed ? "Completed" : "Not complete"}
                </p>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default CompletedList;
