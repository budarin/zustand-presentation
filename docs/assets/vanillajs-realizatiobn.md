Чтобы переписать компонент React и хук на ванильный JavaScript,
нужно заменить React-специфичные части на эквиваленты в чистом JavaScript.
Основная задача — это создать механизм для подписки на изменения состояния
и обновления DOM, когда состояние изменяется.

Вот пример того, как можно это сделать:

1. Создание объекта pub/sub:

```js
const store = (function () {
  let state = { count: 0 };
  let listeners = [];

  return {
    getState: (selector) => selector(state),
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
})();
```

2. Создание функции useStore:

```js
function useStore(selector, callback) {
  const handleChange = (newState) => {
    const currentState = selector(newState);
    callback(currentState);
  };

  const unsubscribe = store.subscribe(handleChange);

  // Initial state setting
  callback(selector(store.getState()));

  return unsubscribe;
}
```

3. Создание компонента Counter на ванильном JS:

```js
function Counter() {
  const element = document.createElement("div");

  function render(count) {
    element.textContent = count;
  }

  const unsubscribe = useStore((state) => state.count, render);
  element.cleanup = unsubscribe;

  return element;
}
```

4. Пример использования

```js
document.addEventListener("DOMContentLoaded", () => {
  const counterComponent = Counter();
  document.body.appendChild(counterComponent);

  // Simulate state changes
  setTimeout(() => store.setState({ count: 1 }), 1000);
  setTimeout(() => store.setState({ count: 2 }), 2000);
});
```

5. Управление очисткой (если необходимо):
   Если вы хотите управлять очисткой, когда элемент удаляется из DOM, вы можете добавить код в компонент для удаления подписки:

```js
function removeElement(element) {
  if (element.cleanup) {
    element.cleanup();
  }
  element.parentNode.removeChild(element);
}
```

6. Пример удаления

```js
setTimeout(() => removeElement(counterComponent), 5000);
```

Таким образом, мы создали аналог компонента React и хука в ванильном JavaScript.
Используется store для управления состоянием и подпиской на изменения состояния.
Функция useStore принимает селектор и callback для обновления DOM при изменении состояния.
