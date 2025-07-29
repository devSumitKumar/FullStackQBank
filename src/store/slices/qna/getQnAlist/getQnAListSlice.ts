import { getQnAListApi } from "./getQnAListApi";
import { createSlice } from "@reduxjs/toolkit";
import { Note, NotesState } from "../../../../types";

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};


const getQnASlice = createSlice({
  name: "getQnAList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQnAListApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQnAListApi.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload as Note[];
      })
      .addCase(getQnAListApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default getQnASlice.reducer;
