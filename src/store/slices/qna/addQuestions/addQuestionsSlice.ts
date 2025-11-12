import { IGenericResponseState } from "../../../../types";
import { addQuestionsAPI } from "./addQuestionsAPI";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IGenericResponseState = {
    response: "",
    status: "idle",
    error: null,
};


const addQuestionsSlice = createSlice({
    name: 'addQuestions',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(addQuestionsAPI.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(addQuestionsAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.response = action.payload as string;
            })
            .addCase(addQuestionsAPI.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    }
});

export default addQuestionsSlice.reducer;