import { IGenericResponseState } from "../../../../types";
import { addCategoryApi } from "./addCategoryApi";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IGenericResponseState = {
    response: "",
    status: "idle",
    error: null,
};


const getCategorySlice = createSlice({
    name: 'addCategory',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(addCategoryApi.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(addCategoryApi.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.response = action.payload as string;
            })
            .addCase(addCategoryApi.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    }
});

export default getCategorySlice.reducer;