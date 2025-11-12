import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";
import { loginUserReuestType } from "../../../../types";

export const loginAPI = createAsyncThunk(
    "category/saveCategory",
    async (payload: loginUserReuestType) => {
        try {
           const response = await axiosInstance().post("/user/auth/loginUser", payload);
           console.log("Category added successfully:", response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
