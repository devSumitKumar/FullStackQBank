import { User } from "../../../../types";
import { signupAPI } from "./signupAPI";
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


const signupSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(signupAPI.pending, (state) => {
                state.status = "pending";
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(signupAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload as User;
                state.isAuthenticated = true;
            })
            .addCase(signupAPI.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });
    }
});

export default signupSlice.reducer;