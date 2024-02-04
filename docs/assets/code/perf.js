import { useCounterStore } from "./store";
import React, { useEffect, useRef } from "react";

function Counter() {
  const counterRef = useRef(null);
  const countRef = useRef(useCounterStore.getState().count);

  useEffect(() =>
      useCounterStore.subscribe((state) => {
        countRef.current = state.count;
        counterRef.current.textContent = countRef.current;
      }),[]
  );

  return (
    <div>
      <span>Count: </span><span ref={counterRef}>{countRef.current}</span>
    </div>
  );
}

export default Counter;
