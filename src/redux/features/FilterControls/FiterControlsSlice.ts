import { createSlice } from "@reduxjs/toolkit";

export type filterControlType = "All" | "Completed" | "Pending" | "Late";

const initialState: { filterControl: filterControlType } = {
  filterControl: "All",
};

const filterControlsSlice = createSlice({
  name: "filterControlss",
  initialState,
  reducers: {
    viewAll: (state) => {
      state.filterControl = "All";
    },
    viewCompleted: (state) => {
      state.filterControl = "Completed";
    },
    viewPending: (state) => {
      state.filterControl = "Pending";
    },
    viewLate: (state) => {
      state.filterControl = "Late";
    },
  },
});

export const { viewAll, viewCompleted, viewPending, viewLate } =
  filterControlsSlice.actions;

export default filterControlsSlice.reducer;
