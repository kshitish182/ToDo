import Status from '../enum/todoStatus';
import TodoData, {Todos} from '../types/todoData';
import { getSheet } from '../services/updateData';

export let todoData: TodoData = {
	isLoading: false,
	data: [{
		id: 0,
		todo: "",
		status: Status.NOT_COMPLETED
	}]
}

// get all data from the sheets
export const getAllData = async () => {
	todoData = {...todoData, isLoading: true}
	const data = await getSheet(); 
	
	if(!data) {
		return todoData;
	}

	const todos = data.map(value => (
		{
			id: value.id,
			todo: value.todo,
			status: value.status
		}
	));
	
	return {...todoData, data: todos, isLoading: false}
}

