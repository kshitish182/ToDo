import React from "react";

import Status from "../../enum/todoStatus";
import TodoData, { Todos } from "../../types/todoData";
import { todoData, getAllData } from "../../selectors/todoData";
import { addToSheet, updateTodoStatus } from "../../services/updateData";


const TodoMain = () => {
  const ENTER_BTN_KEY_CODE = 13;
  const [todoDatas, addTodos] = React.useState<TodoData>(todoData);
  const [isInputShown, showInput] = React.useState<boolean>(false);

  const storeTodos = () => {
    const inputContext: any = document.getElementById("todo-input") || "";

    if (!inputContext) {
      return;
    }

    const todoId: number = todoDatas.data[todoDatas.data.length - 1].id*1 + 1;
    console.log(todoDatas.data[todoDatas.data.length - 1]);
    const createdTodo: Todos = {
      id: todoId,
      todo: inputContext.value || "",
      status: Status.NOT_COMPLETED,
    };

    addTodos({ ...todoDatas, data: [...todoDatas.data, createdTodo] });
    inputContext.value = "";
    addToSheet(createdTodo);
  };

  React.useEffect(() => {
    (async () => {
      addTodos({ ...todoDatas, isLoading: true });
      const result = await getAllData();

      addTodos(result);
    })();
  }, []);


  const handleUserSubmit = () => {
    storeTodos();
  };

  // TODO: Change implementation logic
  const handleStatusChange = (value: Todos) => {
    value.status = value.status == Status.COMPLETED
      ? Status.NOT_COMPLETED
      : Status.COMPLETED;

    addTodos({ ...todoDatas });
    updateTodoStatus(value.id);
  }

  return (
    <>
      <div className="title title--lg">
        <div className="title__text">Today</div>
      </div>
      {todoDatas.isLoading ? (
        "loading..."
      ) : (
        <>
          <ul className="list">
            {todoDatas.data.map((value, idx) => {
             
              return(
              !!value.todo && (
                <li
                  className="list__item list__item--bordered"
                  style={{
                    textDecoration:
                    // TODO: Change this workaround
                      (value.status == Status.COMPLETED
                        ? "line-through"
                        : "none")
                  }}
                  key={`todo-${idx}`}
                >
                  <input
                    type="checkbox"
                    id={`checklist-${value.id}`}
                    checked={value.status == Status.COMPLETED}
                    onChange={() => handleStatusChange(value)}
                  />
                  <label htmlFor={`checklist-${value.id}`} className="checkbox">
                    <div className="icon-tick"/>
                  </label>
                  <div className="list__content">
                  {value.todo}
                  </div>
                </li>
              ))})
            }
            {isInputShown && (
              <li className="list__item list__item--bordered">
                <input
                  type="text"
                  id="todo-input"
                  placeholder="Enter your task here (Press 'enter' when you're done)"
                  className="input-lg"
                  onKeyDown={(event) => {
                    if (event.keyCode === ENTER_BTN_KEY_CODE) {
                      showInput(false);

                      return handleUserSubmit();
                    }
                  }}
                />
                {/*  TODO: Add options to edit and add todo from adjacent buttons */}
                {false && <button
                  className="btn btn--transparent"
                  onClick={handleUserSubmit}
                >
                  <svg className="icon icon-plus" width="13" height="13">
                    <path
                      d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>}
              </li>
            )}
          </ul>
          <button
            className="btn btn--transparent btn--with-icon"
            onClick={() => showInput(true)}
          >
            <div className="indicator">
              <svg className="icon icon-plus" width="13" height="13">
                <path
                  d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span>Add task</span>
          </button>
        </>
      )}
    </>
  );
};

export default TodoMain;
