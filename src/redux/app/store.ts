import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../features/Tasks/TasksSilce";
import modalsSliceReducer from "../features/Modals/ModalsSlice";
import filterControlsSliceReducer from "../features/FilterControls/FiterControlsSlice";
import invoiceSliceReducer from "../features/Invoices/InvoicesSlice";
import { singleTaskType } from "../../types/Tasks";
import { mainInvoiceType } from "../../types/mainInvoice";
import { filterControlType } from "../features/FilterControls/FiterControlsSlice";

export interface RootState {
  modalsSliceReducer: {
    createTaskModal: boolean;
    viewTaskModal: boolean;
    deleteAllTaskModal: boolean;
    editInvoiceStatusModal: boolean;
    editInvoiceStatusId: null | number;
    viewInvoiceId: null | number;
  };
  tasksSliceReducer: singleTaskType[];
  invoiceSliceReducer: mainInvoiceType[];
  filterControlsSliceReducer: { filterControl: filterControlType };
}

const store = configureStore({
  reducer: {
    tasksSliceReducer,
    modalsSliceReducer,
    filterControlsSliceReducer,
    invoiceSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export default store;
