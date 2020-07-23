import React from "react";

import Status from "../../enum/todoStatus";
import LoaderComponent from "./LoaderComponent";
import TodoData, { Todos } from "../../types/todoData";
import { todoData, getAllData } from "../../selectors/todoData";
import { addToSheet, updateTodoStatus } from "../../services/updateData";
import TodoListItem from "./TodoListItem";

const TodoMain = () => {
  // TODO: Rename this local state name
  const [todoDatas, addTodos] = React.useState<TodoData | null>(null);

  const storeTodos = () => {
    const inputContext: any = document.getElementById("todo-input") || "";

    if (!inputContext || !todoDatas) {
      return;
    }

    const todoId: number = todoDatas.data[todoDatas.data.length - 1].id * 1 + 1;
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
      addTodos({ ...todoData, isLoading: true });
      const result = await getAllData();

      addTodos(result);
    })();
  }, []);

  const handleUserSubmit = () => {
    storeTodos();
  };

  // TODO: Change implementation logic
  const handleStatusChange = async (value: Todos) => {
    if (!todoDatas) {
      return;
    }

    value.status =
      value.status * 1 === Status.COMPLETED
        ? Status.NOT_COMPLETED
        : Status.COMPLETED;

    addTodos({ ...todoDatas });

    const result = await updateTodoStatus(value.id, value.status);

    // Reverting state if update fails
    if (!result) {
      value.status =
        value.status * 1 === Status.COMPLETED
          ? Status.NOT_COMPLETED
          : Status.COMPLETED;
      addTodos({ ...todoDatas });
    }
  };

  return (
    <>
      <div className="title title--lg">
        <div className="title__text">Today</div>
      </div>
      {todoDatas?.isLoading || !todoDatas ? (
        <LoaderComponent />
      ) : (
        <>
          {todoDatas && (
            <TodoListItem
              todoData={todoDatas}
              handleStatusChange={handleStatusChange}
              handleUserSubmit={handleUserSubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default TodoMain;
