import { createSlice } from "@reduxjs/toolkit";
import { GLoader } from "../../types";

const initialState: GLoader = {
    loading: false,
}

const loader = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoading(state){
            state.loading = true;
        },
        hideLoading(state){
            state.loading = false;
        }
    }
})

export const { showLoading, hideLoading } = loader.actions;  // export actions as well
export default loader.reducer