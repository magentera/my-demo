import * as React from "react";
import "./Content.css";
import FilterClick from "./FilterClick";
import IntervalList from "./IntervalList";
import PromiseChain from "./PromiseChain";
import LongList from "./LongList";

class Content extends React.Component {
  public render() {
    return (
      <div className="container">
        <LongList />
        <FilterClick />
        <IntervalList />
        <PromiseChain />
      </div>
    );
  }
}

export default Content;
