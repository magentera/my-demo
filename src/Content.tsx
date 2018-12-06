import * as React from "react";
import "./Content.css";
import FilterClick from "./FilterClick";
import LongList from "./LongList";
import NotCompletedList from "./NotCompletedList";
import CompletedList from "./CompletedTodoList";

class Content extends React.Component {
  public render() {
    return (
      <div className="container">
        <FilterClick />
        <LongList />
        <CompletedList />
        <NotCompletedList />
      </div>
    );
  }
}

export default Content;
