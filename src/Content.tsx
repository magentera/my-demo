import * as React from "react";
import * as Rx from "rxjs/Rx";
import "./Content.css";

class Content extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="item">
          <header className="App-header">
            <h1 className="App-title">
              <code>filter()</code>
            </h1>
            <div>
              {
Rx.Observable.of(2, 30, 22, 5, 60, 1)
  .filter(x => x > 10)
  .subscribe(x => console.log("item:", x));}
            </div>
          </header>
        </div>

        <div className="item">
          <header className="App-header">
            <h1 className="App-title">
              <code>debounce()</code>
            </h1>
          </header>
        </div>

        <div className="item">
          <header className="App-header">
            <h1 className="App-title">
              <code>distinct()</code>
            </h1>
          </header>
        </div>

        <div className="item">
          <header className="App-header">
            <h1 className="App-title">
              <code>takeUntil()</code>
            </h1>
          </header>
        </div>

        <div className="item">
          <header className="App-header">
            <h1 className="App-title">
              <code>map()</code>
            </h1>
          </header>
        </div>
      </div>
    );
  }
}

export default Content;
