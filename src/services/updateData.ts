
import { Row } from '../types/Row';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SPREADSHEET_ID,SHEET_ID , CLIENT_EMAIL, PRIVATE_KEY } from "../constants/common";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const initializeConnection = async () => {
	try {
		await doc.useServiceAccountAuth({
			client_email: CLIENT_EMAIL,
			private_key: PRIVATE_KEY,
		});
		// loads document properties and worksheets
	} catch (e) {
		console.error('Error: ', e);	
	}
}

export const updateSheet = async (row: Row) => {
	await initializeConnection();	
	await doc.loadInfo();

	const sheet = doc.sheetsById[SHEET_ID];
		sheet.addRow(row)
		.then( result => {
			console.log(result);
		})
		.catch(err => console.log('error'));
}

export const getSheet = async () => {
	await initializeConnection();
	await doc.loadInfo();
	const sheet = doc.sheetsById[SHEET_ID];
	sheet.getRows({limit: 1, offset: 2})
	.then(result => console.log(result))
	.catch(err => console.log(err));

}
