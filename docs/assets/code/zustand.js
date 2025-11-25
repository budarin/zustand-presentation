import { store } from "./store";
import { useEffect, useState } from "react";

function useStore(selector) {
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
  }, [selector]);

  return prevState;
}

export default useStore;
