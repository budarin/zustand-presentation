import { create } from "zustand";

export const useCounterStore = create(() => ({
  count: 0,
}));

export const increment = () => {
  const state = useCounterStore.getState();
  useCounterStore.setState({ count: state.count + 1 });
};
