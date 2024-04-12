import { configureStore } from "@reduxjs/toolkit";
import tasksSliceReducer from "../features/Tasks/TasksSilce";
import modalsSliceReducer from "../features/Modals/ModalsSlice";
import filterControlsSliceReducer from "../features/FilterControls/FiterControlsSlice";
import { singleTaskType } from "../../types/Tasks";

export interface RootState {
  modalsSliceReducer: {
    createTaskModal: boolean;
    editTaskModal: boolean;
    editModalDetails: {
      oldTitle: string;
      oldDescription: string;
      oldId: number;
    };
  };
  tasksSliceReducer: singleTaskType[];
  filterControlsSliceReducer: { filterControl: string };
}

const store = configureStore({
  reducer: {
    tasksSliceReducer,
    modalsSliceReducer,
    filterControlsSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export default store;
