import React from "react";
import { useCounterStore } from "./store";

function Counter() {
  const count = useCounterStore((state) => state.count);

  return <div>{count}</div>;
}

export default Counter;
