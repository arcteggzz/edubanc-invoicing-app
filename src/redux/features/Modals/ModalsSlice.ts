import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTaskModal: false,
  editTaskModal: false,
  editModalDetails: {
    oldId: 0,
    oldTitle: "",
    oldDescription: "",
  },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openCreateTaskModal: (state) => {
      state.createTaskModal = true;
    },
    closeCreateTaskModal: (state) => {
      state.createTaskModal = false;
    },
    openEditTaskModal: (state) => {
      state.editTaskModal = true;
    },
    closeEditaskModal: (state) => {
      state.editTaskModal = false;
    },
    setEditModalDetails: (state, action) => {
      state.editModalDetails.oldDescription = action.payload.oldDescription;
      state.editModalDetails.oldTitle = action.payload.oldTitle;
      state.editModalDetails.oldId = action.payload.oldId;
    },
    clearEditModalDetails: (state) => {
      state.editModalDetails.oldDescription = "";
      state.editModalDetails.oldTitle = "";
      state.editModalDetails.oldId = 0;
    },
  },
});

export const {
  openCreateTaskModal,
  closeCreateTaskModal,
  openEditTaskModal,
  closeEditaskModal,
  setEditModalDetails,
  clearEditModalDetails,
} = modalsSlice.actions;

export default modalsSlice.reducer;
