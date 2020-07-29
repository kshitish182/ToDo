import React from "react";

import TodoList from "./TodoList";
import Status from "../../enum/todoStatus";
import LoaderComponent from "./LoaderComponent";
import TodoData, { Todos } from "../../types/todoData";
import { todoData, getAllData } from "../../selectors/todoData";
import { addToSheet, updateTodoStatus } from "../../services/updateData";

// TODO: Create a custom expandable textarea component
// import TextArea from '../common/TextArea';

const TodoMain = () => {
  // TODO: Rename this local state name
  const [todoDatas, addTodos] = React.useState<TodoData | null>(null);

  const handleUserSubmit = (value: Todos) => {
    const inputContext: any = document.getElementById("todo-input") || "";

    if (!inputContext || !todoDatas) {
      return;
    }

    addTodos({ ...todoDatas, data: [...todoDatas.data, value] });
    inputContext.value = "";
    addToSheet(value);
  };

  React.useEffect(() => {
    (async () => {
      // loading iniital state 
      addTodos({ ...todoData, isLoading: true });
      const result = await getAllData();

      // overwriting initial state with the data recieved
      addTodos(result);
    })();
  }, []);

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
            <TodoList
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
