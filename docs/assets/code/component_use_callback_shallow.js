import React, { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTodoStore } from "./store";

function TodoItemFieldNames({ id }) {
  const selectFieldNames = useCallback(
    (state) => Object.keys(state.todos[id]),
    [id]
  );
  const fieldNames = useTodoStore(useShallow(selectFieldNames));

  return (
    <li>
      <span>{fieldNames.join(", ")}</span>
    </li>
  );
}

export default TodoItemFieldNames;
