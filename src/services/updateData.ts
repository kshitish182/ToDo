import Status from '../enum/todoStatus'; 
import Header from '../enum/tableHeader';
import { Todos } from '../types/todoData';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SPREADSHEET_ID,SHEET_ID , CLIENT_EMAIL, PRIVATE_KEY } from "../constants/common";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const initializeConnection = async () => {
	try {
		await doc.useServiceAccountAuth({
			client_email: CLIENT_EMAIL,
			private_key: PRIVATE_KEY,
		});
	} catch (e) {
		console.error('Error: ', e);	
	}
}

export const addToSheet = async (row: Todos) => {
	await initializeConnection();	
	await doc.loadInfo();

	const sheet = doc.sheetsById[SHEET_ID];
		sheet.addRow({
			[Header.ROW_ID]: row.id, 
			[Header.TODO]: row.todo, 
			[Header.STATUS]: row.status
		})
		.then( result => {
			console.log(result);
		})
		.catch(err => console.log('error'));
}

export const getSheet = async () => {	
	try {
		await initializeConnection();
		await doc.loadInfo();
		const sheet = doc.sheetsById[SHEET_ID];
		const result = await sheet.getRows()
		// console.log(result);

		return result;
	} catch(err) {
		console.log(err);
	}
}

// updating data

export const updateTodoStatus = async (rowId: number) => {
	try {
		await initializeConnection();
		await doc.loadInfo();
		const sheet = doc.sheetsById[SHEET_ID];
		const result = await sheet.getRows({limit: 1, offset: rowId - 1});
		result[0].status = result[0].status*1 === Status.COMPLETED ? Status.NOT_COMPLETED: Status.COMPLETED;
		await result[0].save();
	} catch(err) {
		console.log(err);
	}
}
