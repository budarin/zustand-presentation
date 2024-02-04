import React from "react";
import { useCounterStore } from "./store";

function Counter() {
  const count = useCounterStore((state) => state.count);

  const onClick = async () => {
    setTimeout(async () => {
      const resp = await fetch("https://my-bank/api/getBalance");
      const { balance } = await resp.json();

      useCounterStore.setState((state) => {
        return { count: state.count + balance };
      });
    }, 250);
  };

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}

export default Counter;
