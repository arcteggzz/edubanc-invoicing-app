import { createSlice } from "@reduxjs/toolkit";

export type filterControlType = "All" | "Completed" | "Pending";

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
  },
});

export const { viewAll, viewCompleted, viewPending } =
  filterControlsSlice.actions;

export default filterControlsSlice.reducer;
