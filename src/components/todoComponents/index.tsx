import React from "react";

import Status from '../../enum/todoStatus';
import TodoData, { Todos } from '../../types/todoData';
import { todoData, getAllData } from '../../selectors/todoData';
import { addToSheet, updateData, getSheet } from '../../services/updateData';

// interface Todos {
// 	id: number;
// 	todo: string;
// 	status: number;
// }

const TodoMain = () => {
	const ENTER_BTN_KEY_CODE = 13;
	const [isInputShown, showInput] = React.useState<boolean>(false);
	const [todoDatas, addTodos] = React.useState<TodoData>(todoData);

	const storeTodos = () => {
		const inputContext:any = document.getElementById('todo-input') || '';

		if(!inputContext) {
			return;
		}
    
    const retreivedTodo = {
      id: todoDatas.data.length,
      todo: inputContext.value || '',
      status: Status.NOT_COMPLETED
    }

    // Comeback here later on
    // console.log(inputContext.scrollHeight);
    
    addTodos({...todoDatas, data:[...todoDatas.data, retreivedTodo]});
    console.log('here',todoDatas);
		inputContext.value="";
  }

  React.useEffect( () => {
    (
      async () => {
        addTodos({...todoDatas, isLoading: true});
        const result = await getAllData();

        if(!result.data.length) {
         return addTodos({...todoData, isLoading: false});
        }

        addTodos(result);
      }
    )();
  }, []);

  React.useEffect( () => {
     // add the latest todo to sheet
     if(!todoDatas.data[todoDatas.data.length - 1].id) {
      return;
    }

    addToSheet(todoDatas.data[todoDatas.data.length - 1]);
  }, [todoDatas]);
  
  const handleUserSubmit = () => {
    storeTodos();
  }

  // const handleStatusChange = (value: Todos) => {
  //   value.status = value.status === Status.COMPLETED ? Status.NOT_COMPLETED : Status.COMPLETED;
  //   addTodos([...todos]);
  //   updateData(value.id);
  // }


  return (
    <>
      <div className="title title--lg">
        <div className="title__text">Today</div>
      </div>
        {todoDatas.isLoading 
          ? 'loading...' 
          : (<ul className="list">
              {todoDatas.data.map((value,idx) =>  {
                console.log('value', value.status, !value.status);

                return (  
					      !!value.todo && 
                  (<li className="list__item" style={{textDecoration: (value.status === Status.COMPLETED ? "line-through" : 'none')}} key={`todo-${idx}`}>
                    <input type="checkbox" id="checklist" checked={value.status === Status.COMPLETED} 
                      onChange={() => { 
                        value.status = value.status === Status.COMPLETED ? Status.NOT_COMPLETED : Status.COMPLETED;
                        addTodos({...todoDatas});
                        }} 
                      />
                    {value.todo}
                  </li>)
                )})
              }
              {isInputShown && (
                <li className="list__item">
                  <textarea  
                  id="todo-input" 
                  placeholder="Enter your task here" 
                  onKeyDown={(event) => {
                    if(event.keyCode === ENTER_BTN_KEY_CODE) {
                      showInput(false);

                      return handleUserSubmit();
                    }	
                  }}
                  />
                  <button className="btn btn--transparent" onClick={handleUserSubmit}>
                    <svg className="icon-plus" width="13" height="13">
                      <path
                        d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                        fill="currentColor"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              )}
            </ul>
          )} 
          <button
            className="btn btn--transparent btn--with-icon"
            onClick={() => showInput(true)}
          >
            <svg className="icon-plus" width="13" height="13">
              <path
                d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <span>Add task</span>
          </button>
           {/* (<ul className="list">
				{todos.map((value,idx) =>  (
					!!value.todo && 
					(<li className="list__item" style={{textDecoration: value.status ? "line-through" : 'none'}} key={`todo-${idx}`}>
						<input type="checkbox" id="checklist" checked={!!value.status} onChange={() => { 
							value.status = value.status === Status.COMPLETED ? Status.NOT_COMPLETED : Status.COMPLETED;
							addTodos([...todos]);
							}} />
						{value.todo}
					</li>)	
				))}
        {isInputShown && (
          <li className="list__item">
						<textarea  
						id="todo-input" 
						placeholder="Enter your task here" 
						onKeyDown={(event) => {
							if(event.keyCode === ENTER_BTN_KEY_CODE) {
                showInput(false);

								return handleUserSubmit();
							}	
						}}
						/>
            <button className="btn btn--transparent" onClick={handleUserSubmit}>
              <svg className="icon-plus" width="13" height="13">
                <path
                  d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
      <button
        className="btn btn--transparent btn--with-icon"
        onClick={() => showInput(true)}
      >
        <svg className="icon-plus" width="13" height="13">
          <path
            d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <span>Add task</span>
      </button> */}
    </>
  );
};

export default TodoMain;
