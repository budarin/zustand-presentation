import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,

  increment: async () => {
    const resp = await fetch("https://my-bank/api/getBalance");
    const { balance } = await resp.json();

    set((state) => {
      return { count: state.count + balance };
    });
  },
}));
