import { createSlice } from "@reduxjs/toolkit";
import { singleTaskType } from "../../../types/Tasks";

const getInitialState = (): singleTaskType[] => {
  const savedTasks = localStorage.getItem("allSavedTasks");
  if (savedTasks === null) {
    return []; // If no data is found in local storage, return undefined to use the default initial state
  }
  return JSON.parse(savedTasks);
};

const initialState: singleTaskType[] = getInitialState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addnewTask: (state, action) => {
      const newTask = {
        id: +Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.push(newTask);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
    editTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].description = action.payload.newDescription;
      state[index].title = action.payload.newTitle;
    },
  },
});

export const { addnewTask, toggleComplete, deleteTask, editTask } =
  tasksSlice.actions;

// export const getAllTasks = (state: { tasks: { tasks: TaskType[] } }) =>
//   state.tasks.tasks;

export default tasksSlice.reducer;
