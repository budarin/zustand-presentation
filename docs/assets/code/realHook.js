import { useSyncExternalStoreWithSelector } from "react";

export function useStore(store, selector, equalityFn) {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getServerState || store.getInitialState,
    selector,
    equalityFn
  );
}
