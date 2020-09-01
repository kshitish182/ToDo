import React from "react";
import { Todos } from "../../types/todoData";

interface EditTodoProps {
  addToState: (value: any) => void;
  showInput: (value: boolean) => void;
  handleUserSubmit: (value: Todos) => void;
  createdTodo: Todos;
}

const ENTER_BTN_KEY_CODE = 13;

const EditTodo = ({
  addToState,
  showInput,
  handleUserSubmit,
  createdTodo,
}: EditTodoProps) => {
  const handleKeyPressAction = (e: any) => {
    if (e.keyCode === ENTER_BTN_KEY_CODE) {
      showInput(false);

      return handleUserSubmit(createdTodo);
    }
  };

  return (
    <>
      <input
        type="text"
        id="todo-input"
        placeholder="Enter your task here (Press 'enter' when you're done)"
        className="input-lg"
        onChange={(e) => addToState(e)}
        onKeyDown={(e) => handleKeyPressAction(e)}
      />

      {/*  TODO: Add options to edit and add todo from adjacent buttons */}
      {/* {false && 
          <button
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
          </button>
				} 
			*/}
    </>
  );
};

export default EditTodo;
