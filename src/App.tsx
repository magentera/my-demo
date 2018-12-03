import React, { Component } from "react";
import * as Rx from "rxjs/Rx";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
Rx.Observable.of(2, 30, 22, 5, 60, 1)
  .filter(x => x > 10)
  .subscribe(x => console.log("item:", x));

export default App;
