import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../apiClient/axiosInstance";
import { IAddCategoryReq } from "../../../../types";

export const addCategoryApi = createAsyncThunk(
    "category/saveCategory",
    async (payload: IAddCategoryReq) => {
        try {
           const response = await axiosInstance().post("category/saveCategory", payload);
           console.log("Category added successfully:", response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
