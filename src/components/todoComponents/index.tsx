import React from "react";

interface Todos {
	id: number;
	todo: string;
	isCompleted: boolean;
}

const TodoMain = () => {
	const ENTER_BTN_KEY_CODE = 13;
	const [isInputShown, showInput] = React.useState<boolean>(false);
	const [todos, addTodos] = React.useState<Todos[]>([{id: 0, todo: '', isCompleted: false}]);

	const storeTodos = () => {
		const inputContext:any = document.getElementById('todo-input') || '';

		if(!inputContext) {
			return;
		}
		
		console.log(inputContext.scrollHeight);
		addTodos([...todos, {id: todos.length, todo: inputContext.value || '', isCompleted: false} ]);
		inputContext.value="";
	}

  return (
    <>
      <div className="title title--lg">
        <div className="title__text">Today</div>
      </div>
      <ul className="list">
				{todos.map((value,idx) =>  (
					!!value.todo && 
					(<li className="list__item" style={{textDecoration: value.isCompleted ? "line-through" : 'none'}} key={`todo-${idx}`}>
						<input type="checkbox" id="checklist" checked={value.isCompleted} onChange={() => { 
							value.isCompleted = !value.isCompleted;
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
                
								return storeTodos();
							}	
						}}
						/>
            <button className="btn btn--transparent" onClick={storeTodos}>
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
      </button>
    </>
  );
};

export default TodoMain;
