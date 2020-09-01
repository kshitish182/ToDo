import Header from "../enum/tableHeader";
import { Todos } from "../types/todoData";
import { GoogleSpreadsheet } from "google-spreadsheet";
import {
  SPREADSHEET_ID,
  SHEET_ID,
  CLIENT_EMAIL,
  PRIVATE_KEY,
} from "../constants/common";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const initializeConnection = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
  } catch (e) {
    console.error("Error: ", e);
  }
};

export const addToSheet = async (row: Todos) => {
  try {
    await initializeConnection();
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow({
      [Header.ROW_ID]: row.id,
      [Header.TODO]: row.todo,
      [Header.STATUS]: row.status,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSheet = async () => {
  try {
    await initializeConnection();
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.getRows();

    return result;
  } catch (err) {
    console.log(err);
  }
};

// updating data

export const updateTodoStatus = async (rowId: number, status: number) => {
  try {
    await initializeConnection();
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.getRows({ limit: 1, offset: rowId - 1 });
    result[0].status = status;
    await result[0].save();

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const updatedTodoData = async (todoData: Todos) => {
  const { id, todo } = todoData;
  try {
    await initializeConnection();
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    const [result] = await sheet.getRows({ limit: 1, offset: id - 1 });
    console.log(result, todo);
    result.todo = todo;
    await result.save();

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};
