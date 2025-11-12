import { User } from "../../../../types";
import { loginAPI } from "./loginAPI";
import { createSlice } from "@reduxjs/toolkit";



interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    status: string;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
};



const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(loginAPI.pending, (state) => {
                state.status = "pending";
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(loginAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload as User;
                state.isAuthenticated = true;
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });
    }
});

export default loginSlice.reducer;