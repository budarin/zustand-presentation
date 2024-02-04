import React from "react";
import { useCounterStore } from "./store";

const countSelector = (state) => state.count;

function Counter() {
  const count = useCounterStore(countSelector);

  return <div>{count}</div>;
}

export default Counter;
