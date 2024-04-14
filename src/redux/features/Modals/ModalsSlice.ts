import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //control if a particular modal is opened or closed
  createTaskModal: false,
  viewTaskModal: false,
  deleteAllTaskModal: false,
  editInvoiceStatusModal: false,

  //comtrol the Id of the selected Invoice for which modal
  editInvoiceStatusId: null,
  viewInvoiceId: null,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    //control create Task Modal
    openCreateTaskModal: (state) => {
      state.createTaskModal = true;
    },
    closeCreateTaskModal: (state) => {
      state.createTaskModal = false;
    },

    //control view Task Modal
    openViewTaskModal: (state) => {
      state.viewTaskModal = true;
    },
    closeViewTaskModal: (state) => {
      state.viewTaskModal = false;
    },

    //control delete all Task Modal
    openDeleteAllTaskModal: (state) => {
      state.deleteAllTaskModal = true;
    },
    closeDeleteAllTaskModal: (state) => {
      state.deleteAllTaskModal = false;
    },

    //control edit Invoice Status Task Modal
    openEditInvoiceStatusModal: (state) => {
      state.editInvoiceStatusModal = true;
    },
    closeEditInvoiceStatusModal: (state) => {
      state.editInvoiceStatusModal = false;
    },

    //control the set and clear for edit Invoice Status
    setEditInvoiceStatusId: (state, action) => {
      state.editInvoiceStatusId = action.payload.id;
    },
    clearEditInvoiceStatusId: (state) => {
      state.editInvoiceStatusId = null;
    },

    //control the set and clear for view Invoice
    setViewInvoiceId: (state, action) => {
      state.viewInvoiceId = action.payload.id;
    },
    clearViewInvoiceId: (state) => {
      state.viewInvoiceId = null;
    },
  },
});

export const {
  openCreateTaskModal,
  closeCreateTaskModal,
  openViewTaskModal,
  closeViewTaskModal,
  openDeleteAllTaskModal,
  closeDeleteAllTaskModal,
  openEditInvoiceStatusModal,
  closeEditInvoiceStatusModal,
  setEditInvoiceStatusId,
  clearEditInvoiceStatusId,
  setViewInvoiceId,
  clearViewInvoiceId,
} = modalsSlice.actions;

export default modalsSlice.reducer;
