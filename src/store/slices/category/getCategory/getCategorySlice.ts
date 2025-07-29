import { ICategory, ICategorySate } from "../../../../types";
import { getCategoryApi } from "./getCategoryAPi";
import { createSlice } from "@reduxjs/toolkit";


const initialState: ICategorySate = {
  category:[] ,
  status: "idle",
  error: null,
};




const getCategorySlice = createSlice({
  name: 'getCategory',
  initialState, 
  reducers: {
    resetCategoryState: (state) => {
      state.category = [];
      state.status = "idle";
      state.error = null;
    },


  },
    extraReducers(builder) {
    builder
      .addCase(getCategoryApi.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getCategoryApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload as ICategory[];
      })
      .addCase(getCategoryApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  }
});     

export default getCategorySlice.reducer;