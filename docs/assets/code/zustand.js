import { useEffect, useState } from "react";

export function useStore(store, selector) {
  const [state, setState] = useState(store.getState(selector));

  useEffect(() => {
    const unsubscribe = store.subscribe((storeState) => {
      const newState = selector(storeState);

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
