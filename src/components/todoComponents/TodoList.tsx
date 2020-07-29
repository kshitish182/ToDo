import React from 'react';

import TodoListItem from "./TodoListItem";
import Status from '../../enum/todoStatus';
import TodoData, {Todos} from "../../types/todoData";

interface TodoListProps {
  todoData: TodoData
  handleStatusChange: (value: Todos ) => void;
  handleUserSubmit: (value: Todos) => void;
}

const TodoList = (props: TodoListProps) => {
  const {todoData, handleStatusChange, handleUserSubmit} = props;

  const [isInputShown, showInput] = React.useState<boolean>(false);
  const [isEditable, setEditStatus] = React.useState<boolean>(false);
  const [ createdTodo, setTodo ] = React.useState<Todos>({id: 0, todo: '', status: 0});
  
  const ENTER_BTN_KEY_CODE = 13;

  const addToState = (e:any) => {
    const todoId: number = todoData.data[todoData.data.length - 1].id * 1 + 1;
    
    setTodo({
      id: todoId,
      todo: e.target.value || "",
      status: Status.NOT_COMPLETED,
    });
  }
  
  return (
  <>
  <ul className="list">
    {todoData.data.map((data: Todos, idx) => (
      // Not mapping empty todos
      !!data.todo && (
        <TodoListItem 
          key={idx}
          todo={data}
          handleStatusChange={handleStatusChange}
        />
      )))
    }
    {isInputShown && (
      <li className="list__item list__item--bordered">
        <input
          type="text"
          id="todo-input"
          placeholder="Enter your task here (Press 'enter' when you're done)"
          className="input-lg"
          onChange={e => addToState(e)}
          onKeyDown={(event) => {
            if (event.keyCode === ENTER_BTN_KEY_CODE) {
              showInput(false);

              return handleUserSubmit(createdTodo);
            }
          }}
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
        } */}
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
);
}

export default TodoList;