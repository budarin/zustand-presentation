import { useEffect, useState } from "react";

export function useStore(store, selector) {
  const [state, setState] = useState(store.getState(selector));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      const newState = selector(newState);

      if (newState !== state) {
        setState(newState);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return state;
}
