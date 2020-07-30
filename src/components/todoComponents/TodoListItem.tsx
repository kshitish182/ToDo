import React from "react";

import Status from "../../enum/todoStatus";
import { Todos } from "../../types/todoData";

interface TodoListItemProps {
  todo: Todos;
  handleStatusChange: (value: Todos) => void;
}

const TodoListItem = (props: TodoListItemProps) => {
  const { todo, handleStatusChange } = props;
  const [isEditable, setEditStatus] = React.useState<boolean>(false);

  return (
    <li className="list__item list__item--bordered">
      {!isEditable ? (
        <>
          <input
            type="checkbox"
            id={`checklist-${todo.id}`}
            checked={todo.status * 1 === Status.COMPLETED}
            onChange={() => handleStatusChange(todo)}
          />
          <label htmlFor={`checklist-${todo.id}`} className="checkbox">
            <div className="icon-tick" />
          </label>
          <div
            className="list__content"
            style={{
              textDecoration:
                // TODO: Change this workaround
                todo.status * 1 === Status.COMPLETED ? "line-through" : "none",
            }}
            onClick={() => setEditStatus(false)}
          >
            {todo.todo}
          </div>
        </>
      ) : (
        <div />
        // <input
        //   type="text"
        //   id="todo-input"
        //   placeholder="Enter your task here (Press 'enter' when you're done)"
        //   className="input-lg"
        //   onChange={e => addToState(e)}
        //   onKeyDown={(event) => {
        //     if (event.keyCode === ENTER_BTN_KEY_CODE) {
        //       showInput(false);

        //       return handleUserSubmit(createdTodo);
        //     }
        //   }}
        // />
      )}
    </li>
  );
};

export default TodoListItem;
