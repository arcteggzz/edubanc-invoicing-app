import { createSlice } from "@reduxjs/toolkit";
import { mainInvoiceType } from "../../../types/mainInvoice";
import { localStorageKey, getTodayDate } from "../../../utils";

const getInitialState = (): mainInvoiceType[] => {
  const savedInvoices = localStorage.getItem(localStorageKey);
  if (savedInvoices === null) {
    return []; // If no data is found in local storage, return undefined to use the default initial state
  }
  return JSON.parse(savedInvoices);
};

const initialState: mainInvoiceType[] = getInitialState();

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addNewInvoice: (state, action) => {
      const newInvoice = {
        ...action.payload,
        dateCreated: getTodayDate(),
        id: +Date.now(),
        status: "pending",
      };

      //update LocalStorage
      const savedInvoicesString = localStorage.getItem(localStorageKey);
      const savedInvoices =
        savedInvoicesString === null ? [] : JSON.parse(savedInvoicesString);
      savedInvoices.push(newInvoice);
      const jsonData = JSON.stringify(savedInvoices);
      localStorage.setItem(localStorageKey, jsonData);

      //update Redux State
      state.push(newInvoice);
    },
    updateInvoiceStatus: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );

      //update LocalStorage
      const savedInvoicesString = localStorage.getItem(localStorageKey);

      const savedInvoices: mainInvoiceType[] =
        savedInvoicesString === null ? [] : JSON.parse(savedInvoicesString);

      const newInvoicesToSave: mainInvoiceType[] = [];

      savedInvoices.map((savedInvoice) => {
        if (savedInvoice.id === action.payload.id) {
          const updatedInvoiceWithStatus = {
            ...savedInvoice,
            status: action.payload.status,
          };
          newInvoicesToSave.push(updatedInvoiceWithStatus);
        } else {
          newInvoicesToSave.push(savedInvoice);
        }
      });

      const jsonData = JSON.stringify(newInvoicesToSave);
      localStorage.setItem(localStorageKey, jsonData);

      //update Redux State
      state[index].status = action.payload.status;
    },
    deleteInvoce: (state, action) => {
      //update LocalStorage
      const savedInvoicesString = localStorage.getItem(localStorageKey);
      const savedInvoices: mainInvoiceType[] =
        savedInvoicesString === null ? [] : JSON.parse(savedInvoicesString);
      const newInvoicesToSave = savedInvoices.filter(
        (savedInvoice) => savedInvoice.id !== action.payload.id
      );
      const jsonData = JSON.stringify(newInvoicesToSave);
      localStorage.setItem(localStorageKey, jsonData);

      //update Redux state
      return state.filter((invoice) => invoice.id !== action.payload.id);
    },
    deleteAllInvoices: (state: mainInvoiceType[]) => {
      //update LocalStorage
      localStorage.removeItem(localStorageKey);

      //update Redux state
      state.splice(0, state.length);
    },
  },
});

export const {
  addNewInvoice,
  updateInvoiceStatus,
  deleteInvoce,
  deleteAllInvoices,
} = invoicesSlice.actions;

// export const getAllTasks = (state: { tasks: { tasks: TaskType[] } }) =>
//   state.tasks.tasks;

export default invoicesSlice.reducer;
