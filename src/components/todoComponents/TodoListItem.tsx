import React from "react";

import Status from "../../enum/todoStatus";
import { Todos } from "../../types/todoData";

interface TodoListItemProps {
	todo: Todos;
	handleStatusChange: (value: Todos) => void
}

const TodoListItem = (props: TodoListItemProps) => {
	const { todo, handleStatusChange } = props;

  return (
    <li
      className="list__item list__item--bordered"
      style={{
        textDecoration:
          // TODO: Change this workaround
          todo.status * 1 === Status.COMPLETED ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        id={`checklist-${todo.id}`}
        checked={todo.status * 1 === Status.COMPLETED}
        onChange={() => handleStatusChange(todo)}
      />
      <label htmlFor={`checklist-${todo.id}`} className="checkbox">
        <div className="icon-tick" />
      </label>
      <div className="list__content">
        {todo.todo}
      </div>
    </li>
  );
};
export default TodoListItem;
