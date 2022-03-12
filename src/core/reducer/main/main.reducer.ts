import { createSlice } from "@reduxjs/toolkit";

import { setEmails, setLoading } from "./actions";

export interface MainState {
  loading: boolean;
  emails: string[];
}

const initialState: MainState = {
  loading: false,
  emails: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setEmails, (state, action) => {
      state.emails = action.payload;
    });
    builder.addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    });
  },
});

export default mainSlice.reducer;
