import { useTodoStore } from "./store";
import React, { useCallback } from "react";

function TodoItem({ id }) {
  const selectTodo = useCallback((state) => state.todos[id], [id]);
  const todo = useTodoStore(selectTodo);

  return (
    <li>
      <span>{todo.id}</span>
      <span>{todo.text}</span>
    </li>
  );
}

export default TodoItem;
