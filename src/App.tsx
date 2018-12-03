import React, { Component } from "react";
import * as Rx from "rxjs/Rx";
import logo from "./logo.png";
import "./App.css";
import Content from "./Content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to RxJS</h1>
        </header>

        <h1>Agenda</h1>
        <p className="App-intro">
          <code>Init</code> | <code>Demo</code> | <code>QA</code>
        </p>
        <Content />
      </div>
    );
  }
}

export default App;
