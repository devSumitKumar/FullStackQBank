import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";
import { registerUserReuestType } from "../../../../types";

export const signupAPI = createAsyncThunk(
    "category/saveCategory",
    async (payload: registerUserReuestType) => {
        try {
           const response = await axiosInstance().post("/user/auth/registerUser", payload);
           console.log("Category added successfully:", response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
