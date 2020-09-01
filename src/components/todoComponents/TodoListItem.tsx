import React from "react";

import Status from "../../enum/todoStatus";
import TodoData, { Todos } from "../../types/todoData";
import { updatedTodoData } from "../../services/updateData";

interface TodoListItemProps {
  todo: Todos;
  todoData: TodoData;
  handleStatusChange: (value: Todos) => void;
}

const ENTER_BTN_KEY_CODE = 13;

const TodoListItem = (props: TodoListItemProps) => {
  const { todo, handleStatusChange, todoData } = props;
  const [isEditable, setEditStatus] = React.useState<boolean>(false);
  const [editedValue, setEditedValue] = React.useState<string>("");

  const handleTodoEdit = (id: number) => {
    const [todoToBeAdded] = todoData.data.filter((value) => value.id === id);
    todoToBeAdded.todo = editedValue;
  };

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
            onClick={() => setEditStatus(true)}
          >
            {todo.todo}
          </div>
        </>
      ) : (
        // <div />
        <input
          type="text"
          id="todo-input"
          placeholder="Enter your task here (Press 'enter' when you're done)"
          className="input-lg"
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === ENTER_BTN_KEY_CODE) {
              updatedTodoData({ ...todo, todo: editedValue });
              setEditStatus(false);
              handleTodoEdit(todo.id);
              // return handleUserSubmit(createdTodo);
            }
          }}
        />
      )}
    </li>
  );
};

export default TodoListItem;
