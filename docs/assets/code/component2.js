import React from "react";
import { useCounterStore, increment } from "./store";

function Counter() {
  const count = useCounterStore((state) => state.count);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
