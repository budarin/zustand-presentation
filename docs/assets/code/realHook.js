import { useSyncExternalStoreWithSelector } from "react";

function useStore(store, selector, equalityFn) {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getServerState || store.getInitialState,
    selector,
    equalityFn
  );
}

export default useStore;
