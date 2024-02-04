import { create } from "zustand";

// никода не экспортируем сам хук с его методами доступа к хранилищу!!!!
const useCounterStore = create(() => ({
  count: 0,
}));

// экспортируем селектор
export const useCounter = () => useCounterStore((state) => state.count);

// экспортируем метод
export const increment = () => {
  const state = useCounterStore.getState();
  useCounterStore.setState({ count: state.count + 1 });
};
