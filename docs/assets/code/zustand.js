import { useEffect, useState } from "react";

export function useStore(store, selector) {
  const [prevState, setPrevState] = useState(store.getState(selector));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      const currentState = selector(newState);

      if (currentState !== prevState) {
        setPrevState(currentState);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return prevState;
}
