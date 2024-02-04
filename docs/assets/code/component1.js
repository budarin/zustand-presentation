import React from "react";
import { useCounterStore } from "./store";

function Counter() {
  const { count, increment } = useCounterStore((state) => state);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
